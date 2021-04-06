defmodule ProjectWeb.Plugs.RequireRouteOwner do
  import Plug.Conn

  def init(args), do: args

  def call(conn, _args) do
    current_user = conn.assigns[:current_user]
    route = conn.assigns[:route]

    if(current_user.id == route.user.id) do
      conn
    else
      conn
      |> put_resp_header(
        "content-type",
        "application/json; charset=UTF-8"
      )
      |> send_resp(
        :unauthorized,
        Jason.encode!(%{"errors" => ["Must be the routeowner to do that."]})
      )
      |> halt()
    end
  end
end
