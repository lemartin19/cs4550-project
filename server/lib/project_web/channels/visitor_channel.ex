defmodule ProjectWeb.VisitorChannel do
  use ProjectWeb, :channel

  import Ecto.Query, only: [from: 2]
  alias Project.Repo
  alias Project.Visitor

  @impl true
  def join("visitor:" <> route_id, _params, socket) do
    {route_id, _bin} = Integer.parse(route_id)
    socket = assign(socket, :route_id, route_id)
    visitors = get_visitors(route_id)
    {:ok, %{visitors: visitors}, socket}
  end

  @impl true
  def handle_in("visit", _params, socket) do
    current_user = socket.assigns[:current_user]
    route_id = socket.assigns[:route_id]

    result =
      Repo.get_by(Visitor, user_id: current_user.id)
      |> add_visitor(current_user.id, route_id)

    case result do
      {:ok, %Visitor{} = _visitor} ->
        visitors = get_visitors(route_id)
        broadcast!(socket, "visitor-update", %{visitors: visitors})
        {:noreply, socket}

      {:error, %Ecto.Changeset{} = _changeset} ->
        {:reply, :error, socket}
    end
  end

  defp get_visitors(route_id) do
    query = from v in Visitor, where: v.route_id == ^route_id

    Repo.all(query)
    |> Repo.preload(:user)
    |> Enum.map(fn visitor -> visitor.user end)
    |> Enum.map(fn user -> %{id: user.id, name: user.name} end)
  end

  defp add_visitor(nil, user_id, route_id) do
    %Visitor{}
    |> Visitor.changeset(%{user_id: user_id, route_id: route_id})
    |> Repo.insert()
  end

  defp add_visitor(%Visitor{} = user_visitor, _user_id, route_id) do
    route_id =
      if user_visitor.route_id == route_id do
        nil
      else
        route_id
      end

    user_visitor
    |> Visitor.changeset(%{route_id: route_id})
    |> Repo.update()
  end
end
