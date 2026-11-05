import { Hono } from "hono";
import { auth } from "./lib/auth";
import { notesModule } from "./modules/notes";

export const app = new Hono() //
  .basePath("/api")
  .on(["GET", "POST"], "/auth/*", (c) => auth.handler(c.req.raw))
  .route("/notes", notesModule());

export type AppType = typeof app;
