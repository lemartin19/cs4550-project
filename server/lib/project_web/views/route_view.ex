defmodule ProjectWeb.RouteView do
  use ProjectWeb, :view
  alias ProjectWeb.RouteView
  alias ProjectWeb.UserView
  alias ProjectWeb.ChangesetView

  def render("index.json", %{routes: routes}) do
    %{data: render_many(routes, RouteView, "route.json")}
  end

  def render("show.json", %{route: route}) do
    %{data: render_one(route, RouteView, "route.json")}
  end

  def render("directions.json", %{directions: directions}) do
    %{data: %{directions: directions}}
  end

  def render("route.json", %{route: route}) do
    %{
      id: route.id,
      name: route.name,
      description: route.description,
      distance: route.distance,
      user: render_one(route.user, UserView, "user.json")
    }
  end

  def render("error.json", %{changeset: changeset}) do
    render_one(changeset, ChangesetView, "error.json")
  end
end
