defmodule ProjectWeb.VisitorChannel do
  use ProjectWeb, :channel

  import Ecto.Query, only: [from: 2]
  alias Project.Repo
  alias Project.Visitor

  @impl true
  def join("visitor:" <> route_id, _params, socket) do
    socket = assign(socket, :route_id, route_id)
    {:ok, socket}
  end

  @impl true
  def handle_in("visit", _params, socket) do
    current_user = socket.assigns[:current_user]
    route_id = socket.assigns[:route_id]

    case Repo.get_by(Visitor, current_user.id)
         |> add_visitor(current_user.id, route_id) do
      {:ok, %Visitor{} = _visitor} ->
        query = from v in "visitors", where: v.route_id == ^route_id

        visitors =
          Repo.all(query)
          |> Repo.preload(:user)
          |> Enum.map(fn visitor -> visitor.user end)

        broadcast!(socket, "visit:" <> route_id, visitors)

        {:noreply, socket}

      {:error, %Ecto.Changeset{} = _changeset} ->
        {:reply, :error, socket}
    end
  end

  defp add_visitor(nil, user_id, route_id) do
    %Visitor{}
    |> Visitor.changeset(%{user_id: user_id, route_id: route_id})
    |> Repo.insert()
  end

  defp add_visitor(%Visitor{} = user_visitor, _user_id, route_id) do
    user_visitor
    |> Visitor.changeset(%{
      route_id:
        if user_visitor.route_id == route_id do
          nil
        else
          route_id
        end
    })
    |> Repo.update()
  end
end
