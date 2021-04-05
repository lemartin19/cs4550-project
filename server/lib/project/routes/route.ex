defmodule Project.Routes.Route do
  use Ecto.Schema
  import Ecto.Changeset

  schema "routes" do
    field :name, :string
    field :description, :string
    field :json, :string
    field :points, :string
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(route, attrs) do
    route
    |> cast(attrs, [:name, :json, :description, :user_id])
    |> validate_required([:name, :json, :description, :user_id])
  end
end
