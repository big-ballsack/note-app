import { testClient } from "hono/testing";
import { app } from "../../app";
import { db } from "../db";

export async function createTestUser() {
  const id = crypto.randomUUID();
  await db.user.create({ data: { id, name: "Test User", email: `${id}@example.com` } });
  return id;
}

export async function signedInClient() {
  const res = await app.request("/api/auth/sign-up/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test User",
      email: `${crypto.randomUUID()}@example.com`,
      password: "password1234",
    }),
  });
  if (!res.ok) {
    throw new Error(`Test sign-up failed with ${res.status}: ${await res.text()}`);
  }
  const cookie = res.headers
    .getSetCookie()
    .map((header) => header.split(";")[0])
    .join("; ");
  return testClient(app, undefined, undefined, { headers: { Cookie: cookie } });
}
