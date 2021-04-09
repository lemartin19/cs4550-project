defmodule ProjectWeb.RouteController do
  use ProjectWeb, :controller

  alias Project.DirectionsApi
  alias Project.Routes
  alias Project.Routes.Route

  action_fallback ProjectWeb.FallbackController

  alias ProjectWeb.Plugs
  plug Plugs.RequireAuth
  plug :require_route when action in [:show, :update, :delete]
  plug Plugs.RequireRouteOwner when action in [:update, :delete]

  def require_route(conn, _args) do
    route = conn.params["id"] |> Routes.get_route!()
    assign(conn, :route, route)
  end

  def index(conn, _params) do
    routes = Routes.list_routes()
    render(conn, "index.json", routes: routes)
  end

  def set_points(conn, %{"points" => points}) do
    directions = DirectionsApi.fetch_directions(points)
    render(conn, "directions.json", %{directions: directions})
  end

  def create(conn, route_params) do
    current_user = conn.assigns[:current_user]

    result =
      route_params
      |> Map.put("user_id", current_user.id)
      |> Map.update!("points", fn pts -> Jason.encode!(pts) end)
      |> Routes.create_route()

    case result do
      {:ok, %Route{} = route} ->
        conn
        |> put_status(:created)
        |> render("show.json", route: route)

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:bad_request)
        |> render("error.json", changeset: changeset)
    end
  end

  def show(conn, _params) do
    route = conn.assigns[:route]
    directions = Jason.decode!(route.points) |> DirectionsApi.fetch_directions()
    render(conn, "show.json", %{route: route, directions: directions})
  end

  def update(conn, route_params) do
    route = conn.assigns[:route]
    route_params = Map.update!(route_params, "points", fn pts -> Jason.encode!(pts) end)

    case Routes.update_route(route, route_params) do
      {:ok, %Route{} = route} ->
        render(conn, "show.json", route: route)

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:bad_request)
        |> render("error.json", changeset: changeset)
    end
  end

  def delete(conn, _params) do
    route = conn.assigns[:route]

    with {:ok, %Route{}} <- Routes.delete_route(route) do
      send_resp(conn, :no_content, "")
    end
  end
end
