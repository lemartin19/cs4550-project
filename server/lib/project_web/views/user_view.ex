defmodule ProjectWeb.UserView do
  use ProjectWeb, :view
  alias ProjectWeb.UserView
  alias ProjectWeb.ChangesetView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id, username: user.username, email: user.email, password_hash: user.password_hash}
  end

  def render("error.json", %{changeset: changeset}) do
    render_one(changeset, ChangesetView, "error.json")
  end
end
