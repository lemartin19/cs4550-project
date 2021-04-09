defmodule Project.Repo.Migrations.CreateVisitors do
  use Ecto.Migration

  def change do
    create table(:visitors) do
      add :user_id, references(:users, on_delete: :nothing), nul: false
      add :route_id, references(:routes, on_delete: :nothing)

      timestamps()
    end

    create unique_index(:visitors, [:user_id])
    create index(:visitors, [:route_id])
  end
end
