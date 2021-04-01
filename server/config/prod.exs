use Mix.Config

# For production, don't forget to configure the url host
# to something meaningful, Phoenix uses this information
# when generating URLs.
#
# Note we also include the path to a cache manifest
# containing the digested version of static files. This
# manifest is generated by the `mix phx.digest` task,
# which you should run after static files are built and
# before starting your production server.
config :project, ProjectWeb.Endpoint,
  url: [host: "project-api.seablue.site", port: 443],
  https: [
    port: 443,
    cipher_suite: :strong,
    certfile: "/etc/letsencrypt/live/seablue.site/fullchain.pem",
    keyfile: "/etc/letsencrypt/live/seablue.site/privkey.pem"
  ],
  force_ssl: [rewrite_on: [:x_forwarded_proto]],
  cache_static_manifest: "priv/static/cache_manifest.json"

# Do not print debug messages in production
config :logger, level: :info

# Finally import the config/prod.secret.exs which loads secrets
# and configuration from environment variables.
import_config "prod.secret.exs"
