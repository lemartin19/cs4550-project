defmodule ProjectWeb.PageController do
  use ProjectWeb, :controller

  def map(conn, _params) do
    render(conn, "map.html")
  end
end
