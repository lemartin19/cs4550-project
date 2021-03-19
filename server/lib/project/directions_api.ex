defmodule Project.DirectionsApi do
  require Logger

  def get_url(start, finish) do
    api_key = Application.get_env(:project, :directions_api_key, nil)

    "https://maps.googleapis.com/maps/api/directions/json?key=#{api_key}&mode=walking&origin=#{
      start
    }&destination=#{finish}"
  end

  def fetch_directions(start, finish, []) do
    %{"status" => "OK", "routes" => route} =
      get_url(start, finish)
      |> HTTPoison.get!()
      |> (fn resp -> resp.body end).()
      |> Jason.decode!()

    route
  end
end
