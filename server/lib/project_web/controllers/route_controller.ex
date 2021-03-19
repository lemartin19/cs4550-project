defmodule ProjectWeb.RouteController do
  use ProjectWeb, :controller

  alias Project.DirectionsApi

  def show(conn, %{"id" => _id}) do
    route = DirectionsApi.fetch_directions([])
    render(conn, "show.json", %{route: route})
  end

  def add_marker(conn, %{"points" => points}) do
    route = DirectionsApi.fetch_directions(points)
    render(conn, "show.json", %{route: route})
  end
end
