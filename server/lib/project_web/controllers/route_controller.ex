defmodule ProjectWeb.RouteController do
  use ProjectWeb, :controller

  alias Project.DirectionsApi

  def show(conn, %{"id" => _id}) do
    start = "30.199009,-97.888534"
    finish = "30.197706,-97.880373"
    route = DirectionsApi.fetch_directions(start, finish, [])
    render(conn, "show.json", route: route)
  end
end
