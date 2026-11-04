import { Hono } from "hono";
import { env } from "./lib/env";

const app = new Hono();

app.get("/api/health", (c) => c.json({ status: "ok" }));

const server = Bun.serve({
  fetch: app.fetch,
  port: env.PORT,
});

console.log(`Backend listening on ${server.url}`);
