defmodule Project.Repo.Migrations.CreateRoutes do
  use Ecto.Migration

  def change do
    create table(:routes) do
      add :name, :string, null: false
      add :description, :string, null: false
      add :points, :string, size: 1027, null: false
      add :distance, :float, null: false
      add :user_id, references(:users, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:routes, [:user_id])
  end
end
