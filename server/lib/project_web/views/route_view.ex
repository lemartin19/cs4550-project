defmodule ProjectWeb.RouteView do
  use ProjectWeb, :view

  def render("show.json", %{route: route}) do
    %{data: render_one(route, RouteView, "route.json")}
  end

  def render("route.json", %{route: route}) do
    %{
      id: route.id,
      directions: route.directions
    }
  end
end
