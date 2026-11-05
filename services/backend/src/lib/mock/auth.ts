import type { Session, User } from "better-auth/types";
import { createMiddleware } from "hono/factory";
import type { AuthEnv } from "../middlewares/auth.middleware";

export function fakeUser(overrides: Partial<User> = {}): User {
  const id = overrides.id ?? crypto.randomUUID();
  return {
    id,
    name: "Test User",
    email: `${id}@example.com`,
    emailVerified: true,
    image: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

function fakeSession(user: User): Session {
  return {
    id: crypto.randomUUID(),
    userId: user.id,
    token: crypto.randomUUID(),
    expiresAt: new Date(Date.now() + 60 * 60 * 1000),
    ipAddress: null,
    userAgent: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

export const signedInAs = (user: User) =>
  createMiddleware<AuthEnv>(async (c, next) => {
    c.set("user", user);
    c.set("session", fakeSession(user));
    await next();
  });
