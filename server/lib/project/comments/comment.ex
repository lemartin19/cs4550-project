defmodule Project.Comments.Comment do
  use Ecto.Schema
  import Ecto.Changeset

  schema "comments" do
    field :body, :string
    field :location, :string
    field :user_id, :id
    field :route_id, :id

    timestamps()
  end

  @doc false
  def changeset(comment, attrs) do
    comment
    |> cast(attrs, [:body, :location, :user_id, :route_id])
    |> validate_location(attrs["location"])
    |> validate_required([:body, :user_id, :route_id])
  end

  def validate_location(changeset, nil) do
    changeset
  end

  def validate_location(changeset, location) do
    case Jason.decode(location) do
      {:ok, json} ->
        check_location(changeset, json)

      {:error, _err} ->
        Ecto.Changeset.add_error(
          changeset,
          :location,
          "Location must be a valid location json"
        )
    end
  end

  def check_location(changeset, %{lat: lat, lng: lng})
      when is_number(lat) and is_number(lng) do
    changeset
  end

  def check_location(changeset, _loc) do
    Ecto.Changeset.add_error(
      changeset,
      :location,
      "Location must have number lat and lng fields"
    )
  end
end
