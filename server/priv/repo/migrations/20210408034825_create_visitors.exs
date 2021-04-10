defmodule Project.Repo.Migrations.CreateVisitors do
  use Ecto.Migration

  def change do
    create table(:visitors) do
      add :user_id, references(:users, on_delete: :delete_all), nul: false
      add :route_id, references(:routes, on_delete: :nilify_all)

      timestamps()
    end

    create unique_index(:visitors, [:user_id])
    create index(:visitors, [:route_id])
  end
end
