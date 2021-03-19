defmodule ProjectWeb.RouteView do
  use ProjectWeb, :view

  require Logger

  def render("show.json", %{route: route}) do
    Logger.info("****************** route")
    IO.inspect(route)
    %{data: render_one(route, RouteView, "route.json")}
  end

  def render("route.json", %{route: route}) do
    %{
      id: route.id,
      directions: route.directions
    }
  end
end
