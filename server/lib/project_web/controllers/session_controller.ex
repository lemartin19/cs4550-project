defmodule ProjectWeb.SessionController do
  use ProjectWeb, :controller

  def create(conn, %{"email" => email, "password" => password}) do
    user = Project.Users.authenticate(email, password)

    if user do
      session = %{
        id: user.id,
        name: user.name,
        email: user.email,
        token: Phoenix.Token.sign(conn, "user_id", user.id)
      }

      conn
      |> put_resp_header(
        "content-type",
        "application/json; charset=UTF-8"
      )
      |> send_resp(
        :created,
        Jason.encode!(%{data: session})
      )
    else
      conn
      |> put_resp_header(
        "content-type",
        "application/json; charset=UTF-8"
      )
      |> send_resp(
        :unauthorized,
        Jason.encode!(%{errors: "fail"})
      )
    end
  end
end
