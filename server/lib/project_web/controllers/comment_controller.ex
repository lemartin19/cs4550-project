defmodule ProjectWeb.CommentController do
  use ProjectWeb, :controller

  alias Project.Comments
  alias Project.Comments.Comment

  action_fallback ProjectWeb.FallbackController

  def index(conn, %{"route_id" => route_id}) do
    comments = Comments.list_comments(route_id)
    render(conn, "index.json", comments: comments)
  end

  def create(conn, %{"comment" => comment_params}) do
    with {:ok, %Comment{} = comment} <- Comments.create_comment(comment_params) do
      conn
      |> put_status(:created)
      |> render("show.json", comment: comment)
    end
  end

  def show(conn, %{"id" => id}) do
    comment = Comments.get_comment!(id)
    render(conn, "show.json", comment: comment)
  end

  def delete(conn, %{"id" => id}) do
    comment = Comments.get_comment!(id)

    with {:ok, %Comment{}} <- Comments.delete_comment(comment) do
      send_resp(conn, :no_content, "")
    end
  end
end
