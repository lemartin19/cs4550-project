defmodule Project.Routes.Route do
  use Ecto.Schema
  import Ecto.Changeset

  schema "routes" do
    field :name, :string
    field :description, :string
    field :points, :string
    belongs_to :user, Project.Users.User

    timestamps()
  end

  @doc false
  def changeset(route, attrs) do
    route
    |> cast(attrs, [:name, :description, :points, :user_id])
    |> validate_required([:name, :description, :points, :user_id])
  end
end
