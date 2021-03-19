defmodule ProjectWeb.RouteView do
  use ProjectWeb, :view

  require Logger

  def render("show.json", %{route: route}) do
    %{data: render_one(route, ProjectWeb.RouteView, "route.json")}
  end

  def render("route.json", %{route: route}) do
    Jason.encode!(route)
  end
end
