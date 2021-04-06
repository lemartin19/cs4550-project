defmodule ProjectWeb.RouteController do
  use ProjectWeb, :controller

  alias Project.DirectionsApi
  alias Project.Routes
  alias Project.Routes.Route

  action_fallback ProjectWeb.FallbackController

  alias ProjectWeb.Plugs
  plug Plugs.RequireAuth

  def index(conn, _params) do
    routes = Routes.list_routes()
    render(conn, "index.json", routes: routes)
  end

  def add_marker(conn, %{"points" => points}) do
    route = DirectionsApi.fetch_directions(points)
    render(conn, "path.json", %{route: route})
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

  def show(conn, %{"id" => id}) do
    route = Routes.get_route!(id)
    render(conn, "show.json", route: route)
  end

  def update(conn, %{"id" => id, "route" => route_params}) do
    route = Routes.get_route!(id)

    with {:ok, %Route{} = route} <- Routes.update_route(route, route_params) do
      render(conn, "show.json", route: route)
    end
  end

  def delete(conn, %{"id" => id}) do
    route = Routes.get_route!(id)

    with {:ok, %Route{}} <- Routes.delete_route(route) do
      send_resp(conn, :no_content, "")
    end
  end
end
