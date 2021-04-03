defmodule ProjectWeb.UserController do
  use ProjectWeb, :controller

  alias Project.Users
  alias Project.Users.User

  action_fallback(ProjectWeb.FallbackController)

  def index(conn, _params) do
    users = Users.list_users()
    render(conn, "index.json", users: users)
  end

  def create(conn, user_params) do
    case Users.create_user(user_params) do
      {:ok, %User{} = user} ->
        session = %{
          id: user.id,
          name: user.name,
          email: user.email,
          token: Phoenix.Token.sign(conn, "user_id", user.id)
        }

        conn
        |> put_resp_header("location", Routes.user_path(conn, :show, user))
        |> send_resp(:created, Jason.encode!(%{data: session}))

      {:error, %Ecto.Changeset{} = changeset} ->
        conn
        |> put_status(:bad_request)
        |> render("error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    user = Users.get_user!(id)
    render(conn, "show.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => user_params}) do
    user = Users.get_user!(id)

    with {:ok, %User{} = user} <- Users.update_user(user, user_params) do
      render(conn, "show.json", user: user)
    end
  end

  def delete(conn, %{"id" => id}) do
    user = Users.get_user!(id)

    with {:ok, %User{}} <- Users.delete_user(user) do
      send_resp(conn, :no_content, "")
    end
  end
end
