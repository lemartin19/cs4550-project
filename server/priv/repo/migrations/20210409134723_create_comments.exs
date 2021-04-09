defmodule Project.Repo.Migrations.CreateComments do
  use Ecto.Migration

  def change do
    create table(:comments) do
      add :body, :string, null: false
      add :location, :string
      add :user_id, references(:users, on_delete: :nothing), null: false
      add :route_id, references(:routes, on_delete: :nothing), null: false

      timestamps()
    end

    create index(:comments, [:user_id])
    create index(:comments, [:route_id])
  end
end
