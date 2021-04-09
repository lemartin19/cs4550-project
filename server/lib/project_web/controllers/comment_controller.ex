defmodule ProjectWeb.CommentController do
  use ProjectWeb, :controller

  alias Project.Comments
  alias Project.Comments.Comment

  action_fallback ProjectWeb.FallbackController

  alias ProjectWeb.Plugs
  plug Plugs.RequireAuth
  plug :require_comment_or_route_owner when action in [:delete]

  def require_comment_or_route_owner(conn, _args) do
    comment = conn.params["id"] |> Comments.get_comment!()
    current_user = conn.assigns[:current_user]

    if comment.user_id != current_user.id &&
         comment.route.user_id != current_user.id do
      conn
      |> put_resp_header(
        "content-type",
        "application/json; charset=UTF-8"
      )
      |> send_resp(
        :unauthorized,
        Jason.encode!(%{"errors" => ["Must be the route or comment owner to do that."]})
      )
      |> halt()
    else
      conn
    end
  end

  def index(conn, %{"route_id" => route_id}) do
    comments = Comments.list_comments(route_id)
    render(conn, "index.json", comments: comments)
  end

  def create(conn, comment_params) do
    current_user = conn.assigns[:current_user]
    comment_params = Map.put(comment_params, "user_id", current_user.id)

    case Comments.create_comment(comment_params) do
      {:ok, %Comment{} = comment} ->
        conn
        |> put_status(:created)
        |> render("show.json", comment: comment)

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:bad_request)
        |> render("error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    comment = Comments.get_comment!(id)

    with {:ok, %Comment{}} <- Comments.delete_comment(comment) do
      send_resp(conn, :no_content, "")
    end
  end
end
