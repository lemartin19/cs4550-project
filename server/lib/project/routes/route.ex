defmodule Project.Routes.Route do
  use Ecto.Schema
  import Ecto.Changeset

  schema "routes" do
    field :description, :string
    field :json, :string
    field :name, :string
    field :user_id, :id

    timestamps()
  end

  @doc false
  def changeset(route, attrs) do
    route
    |> cast(attrs, [:name, :json, :description])
    |> validate_required([:name, :json, :description])
  end
end
