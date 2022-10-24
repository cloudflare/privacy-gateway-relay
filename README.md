# Privacy Gateway Relay

This Cloudflare Worker implements an [Oblivious HTTP](https://datatracker.ietf.org/doc/draft-ietf-ohai-ohttp/) relay. Usage of this relay adheres to the HTTP usage described [in the draft specification](https://datatracker.ietf.org/doc/html/draft-ietf-ohai-ohttp-01#section-6). The functionality here is subject to change.

## Configuration

The relay is configured to forward all requests to the URL identified by the `TARGET` environment variable, configured in the wrangler.toml file. 

```
vars = { TARGET = "https://ohttp-echo.crypto-team.workers.dev/echo-bytes" }
```

Currently, the default wrangler.toml file points to "https://ohttp-echo.crypto-team.workers.dev/echo-bytes", which means that all requests sent to this Worker will be forwarded to this endpoint.

## Deployment

Deployment is simple. Modify the wrangler.toml file to point to your account (and zone), and then publish.

```
$ wrangler publish
```
