defmodule ProjectWeb.RouteView do
  use ProjectWeb, :view
  alias ProjectWeb.RouteView
  alias ProjectWeb.ChangesetView

  def render("index.json", %{routes: routes}) do
    %{data: render_many(routes, RouteView, "route.json")}
  end

  def render("show.json", %{route: route}) do
    %{data: render_one(route, RouteView, "route.json")}
  end

  def render("path.json", %{route: route}) do
    %{data: %{json: route}}
  end

  def render("route.json", %{route: route}) do
    %{id: route.id, name: route.name, json: route.json, description: route.description}
  end

  def render("error.json", %{changeset: changeset}) do
    render_one(changeset, ChangesetView, "error.json")
  end
end
