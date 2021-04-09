defmodule ProjectWeb.CommentView do
  use ProjectWeb, :view
  alias ProjectWeb.CommentView
  alias ProjectWeb.ChangesetView

  def render("index.json", %{comments: comments}) do
    %{data: render_many(comments, CommentView, "comment.json")}
  end

  def render("show.json", %{comment: comment}) do
    %{data: render_one(comment, CommentView, "comment.json")}
  end

  def render("comment.json", %{comment: comment}) do
    %{
      id: comment.id,
      body: comment.body,
      location: comment.location,
      inserted_at: comment.inserted_at
    }
  end

  def render("error.json", %{changeset: changeset}) do
    render_one(changeset, ChangesetView, "error.json")
  end
end
