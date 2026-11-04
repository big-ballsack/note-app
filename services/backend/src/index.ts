import { Hono } from "hono";
import { auth } from "./lib/auth";
import { env } from "./lib/env";

const app = new Hono();

app.on(["GET", "POST"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.get("/api/health", (c) => c.json({ status: "ok" }));

const server = Bun.serve({
  fetch: app.fetch,
  port: env.PORT,
});

console.log(`Backend listening on ${server.url}`);
