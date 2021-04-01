use Mix.Config

# Configure your database
config :project, Project.Repo,
  username: "project",
  password: "cs4550_project",
  database: "project_dev",
  hostname: "localhost",
  show_sensitive_data_on_connection_error: true,
  pool_size: 10

# For development, we disable any cache and enable
# debugging and code reloading.
#
# The watchers configuration can be used to run external
# watchers to your application. For example, we use it
# with webpack to recompile .js and .css sources.
config :project, ProjectWeb.Endpoint,
  https: [
    port: 4001,
    certfile: Path.expand("/etc/letsencrypt/live/project.seablue.site/fullchain.pem", __DIR__),
    keyfile: Path.expand("/etc/letsencrypt/live/project.seablue.site/privkey.pem", __DIR__)
  ],
  debug_errors: true,
  code_reloader: true,
  check_origin: false,
  watchers: []

# Watch static and templates for browser reloading.
config :project, ProjectWeb.Endpoint,
  live_reload: [
    patterns: [
      ~r"priv/static/.*(js|css|png|jpeg|jpg|gif|svg)$",
      ~r"priv/gettext/.*(po)$",
      ~r"lib/project_web/(live|views)/.*(ex)$",
      ~r"lib/project_web/templates/.*(eex)$"
    ]
  ]

# Do not include metadata nor timestamps in development logs
config :logger, :console, format: "[$level] $message\n"

# Set a higher stacktrace during development. Avoid configuring such
# in production as building large stacktraces may be expensive.
config :phoenix, :stacktrace_depth, 20

# Initialize plugs at runtime for faster development compilation
config :phoenix, :plug_init_mode, :runtime

import_config "dev.secret.exs"
