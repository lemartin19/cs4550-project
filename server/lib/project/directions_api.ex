defmodule Project.DirectionsApi do
  require Logger

  def get_url(start, finish, waypoints) do
    api_key = Application.get_env(:project, :directions_api_key, nil)

    waypoints_param =
      if waypoints == [] do
        ""
      else
        "&waypoints=#{Enum.join(waypoints, "|")}"
      end

    "https://maps.googleapis.com/maps/api/directions/json?key=#{api_key}&mode=walking&origin=#{
      start
    }&destination=#{finish}#{waypoints_param}"
  end

  def fetch_directions([]), do: []

  def fetch_directions([_start]), do: []

  def fetch_directions(points) do
    [finish | rest] = Enum.map(points, fn %{"lat" => lat, "lng" => lng} -> "#{lat},#{lng}" end)
    [start | waypoints] = Enum.reverse(rest)

    waypoints =
      Enum.reverse(waypoints)
      |> Enum.map(fn pt -> "via:#{pt}" end)

    url = get_url(start, finish, waypoints)

    %{"status" => "OK", "routes" => route} =
      url
      |> HTTPoison.get!()
      |> (fn resp -> resp.body end).()
      |> Jason.decode!()

    route
  end
end
