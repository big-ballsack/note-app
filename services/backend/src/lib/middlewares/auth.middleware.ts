import { createMiddleware } from "hono/factory";
import { auth } from "../auth";

type Session = typeof auth.$Infer.Session;

/** Hono env for routes behind `requireAuth`: `c.get("user")` and `c.get("session")` are always set */
export type AuthEnv = {
  Variables: {
    user: Session["user"];
    session: Session["session"];
  };
};

/**
 * Rejects requests without a valid session (401) and exposes the signed-in user.
 *
 * @example
 * new Hono<AuthEnv>()
 *   .use(requireAuth)
 *   .get("/", (c) => c.json(c.get("user")));
 */
export const requireAuth = createMiddleware<AuthEnv>(async (c, next) => {
  const result = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!result) {
    return c.json({ message: "Unauthorized" }, 401);
  }
  c.set("user", result.user);
  c.set("session", result.session);
  await next();
});
