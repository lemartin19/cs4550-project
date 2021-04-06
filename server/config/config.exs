# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.

# General application configuration
use Mix.Config

config :project,
  ecto_repos: [Project.Repo]

# Configures the endpoint
config :project, ProjectWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "CdiIN6E4G0SRYn3PqSrawfrkRx7hrSJLTlmS/zw8LefXhvTXP9Xp4QbZ+udgfxqZ",
  render_errors: [view: ProjectWeb.ErrorView, accepts: ~w(html json), layout: false],
  pubsub_server: Project.PubSub,
  live_view: [signing_salt: "vwoGGCkW"]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix
config :phoenix, :json_library, Jason

config :cors_plug,
  # origin: ["https://project.seablue.site"],
  max_age: 86400,
  headers: [
    "Authorization",
    "Content-Type",
    "Accept",
    "Origin",
    "User-Agent",
    "DNT",
    "Cache-Control",
    "X-Mx-ReqToken",
    "Keep-Alive",
    "X-Requested-With",
    "If-Modified-Since",
    "X-CSRF-Token",
    "x-auth"
  ],
  methods: ["GET", "POST", "DELETE"]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env()}.exs"
