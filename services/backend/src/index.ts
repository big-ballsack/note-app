import { app } from "./app";
import { env } from "./lib/env";

const server = Bun.serve({
  fetch: app.fetch,
  port: env.PORT,
});

console.log(`Backend listening on ${server.url}`);
