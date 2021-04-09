defmodule Project.Visitor do
  use Ecto.Schema
  import Ecto.Changeset

  schema "visitors" do
    belongs_to :user, Project.Users.User
    belongs_to :route, Project.Routes.Route

    timestamps()
  end

  @doc false
  def changeset(visitor, attrs) do
    visitor
    |> cast(attrs, [:user_id, :route_id])
    |> validate_required([:user_id])
  end
end
