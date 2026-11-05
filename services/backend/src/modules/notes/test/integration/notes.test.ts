import { describe, expect, test } from "bun:test";
import { testClient } from "hono/testing";
import { app } from "../../../../app";
import { signedInClient } from "../../../../lib/fixtures/users";

describe("notes module", () => {
  describe("without a session", () => {
    const anonymous = testClient(app);

    test("GET /api/notes is rejected", async () => {
      const res = await anonymous.api.notes.$get();
      expect(res.status).toBe(401);
    });

    test("POST /api/notes is rejected", async () => {
      const res = await anonymous.api.notes.$post({ json: { title: "Groceries", content: "Milk" } });
      expect<number>(res.status).toBe(401);
    });
  });

  test("a created note is listed for its author", async () => {
    const alice = await signedInClient();

    const created = await alice.api.notes.$post({ json: { title: "Groceries", content: "Milk" } });
    expect(created.status).toBe(201);

    const notes = await (await alice.api.notes.$get()).json();
    expect(notes).toHaveLength(1);
    expect(await created.json()).toEqual(notes[0]);
  });

  test("users never see each other's notes", async () => {
    const alice = await signedInClient();
    const bob = await signedInClient();

    await alice.api.notes.$post({ json: { title: "Alice's", content: "secret" } });

    const listed = await bob.api.notes.$get();
    expect(await listed.json()).toEqual([]);
  });
});
