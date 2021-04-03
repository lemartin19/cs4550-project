defmodule Project.RoutesTest do
  use Project.DataCase

  alias Project.Routes

  describe "routes" do
    alias Project.Routes.Route

    @valid_attrs %{description: "some description", json: "some json", name: "some name"}
    @update_attrs %{description: "some updated description", json: "some updated json", name: "some updated name"}
    @invalid_attrs %{description: nil, json: nil, name: nil}

    def route_fixture(attrs \\ %{}) do
      {:ok, route} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Routes.create_route()

      route
    end

    test "list_routes/0 returns all routes" do
      route = route_fixture()
      assert Routes.list_routes() == [route]
    end

    test "get_route!/1 returns the route with given id" do
      route = route_fixture()
      assert Routes.get_route!(route.id) == route
    end

    test "create_route/1 with valid data creates a route" do
      assert {:ok, %Route{} = route} = Routes.create_route(@valid_attrs)
      assert route.description == "some description"
      assert route.json == "some json"
      assert route.name == "some name"
    end

    test "create_route/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Routes.create_route(@invalid_attrs)
    end

    test "update_route/2 with valid data updates the route" do
      route = route_fixture()
      assert {:ok, %Route{} = route} = Routes.update_route(route, @update_attrs)
      assert route.description == "some updated description"
      assert route.json == "some updated json"
      assert route.name == "some updated name"
    end

    test "update_route/2 with invalid data returns error changeset" do
      route = route_fixture()
      assert {:error, %Ecto.Changeset{}} = Routes.update_route(route, @invalid_attrs)
      assert route == Routes.get_route!(route.id)
    end

    test "delete_route/1 deletes the route" do
      route = route_fixture()
      assert {:ok, %Route{}} = Routes.delete_route(route)
      assert_raise Ecto.NoResultsError, fn -> Routes.get_route!(route.id) end
    end

    test "change_route/1 returns a route changeset" do
      route = route_fixture()
      assert %Ecto.Changeset{} = Routes.change_route(route)
    end
  end
end
