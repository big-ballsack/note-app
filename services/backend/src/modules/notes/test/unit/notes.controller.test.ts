import { beforeEach, describe, expect, test } from "bun:test";
import { testClient } from "hono/testing";
import { fakeUser, signedInAs } from "../../../../lib/mock/auth";
import { NotesController } from "../../notes.controller";
import { NotesMapper } from "../../notes.mapper";
import { InMemoryNotesRepository } from "../../notes.repository";
import { RealNotesService } from "../../notes.service";

describe("NotesController", () => {
  const alice = fakeUser({ id: "alice" });
  let repository: InMemoryNotesRepository;
  let routes: ReturnType<NotesController["routes"]>;
  let client: ReturnType<typeof testClient<typeof routes>>;

  beforeEach(() => {
    repository = new InMemoryNotesRepository();
    const controller = new NotesController(
      new RealNotesService(repository),
      new NotesMapper(),
      signedInAs(alice),
    );
    routes = controller.routes();
    client = testClient(routes);
  });

  describe("GET /", () => {
    test("returns the signed-in user's notes", async () => {
      const mine = await repository.create(alice.id, { title: "Mine", content: "a" });
      await repository.create("bob", { title: "Not mine", content: "b" });

      const res = await client.index.$get();

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual([mine]);
    });

    test("returns an empty list when the user has no notes", async () => {
      const res = await client.index.$get();

      expect(await res.json()).toEqual([]);
    });
  });

  describe("POST /", () => {
    test("creates the note for the signed-in user", async () => {
      const res = await client.index.$post({ json: { title: "Groceries", content: "Milk" } });

      expect(res.status).toBe(201);
      expect(repository.notes).toEqual([
        { id: expect.any(String), title: "Groceries", content: "Milk", authorId: alice.id },
      ]);
      expect(await res.json()).toEqual(repository.notes[0]);
    });

    test("rejects an invalid body with a 400 and stores nothing", async () => {
      const res = await client.index.$post({ json: { title: "", content: "Milk" } });

      expect(res.status).toBe(400);
      expect(await res.json()).toMatchObject({
        message: "Invalid request body",
        issues: [expect.objectContaining({ path: ["title"] })],
      });
      expect(repository.notes).toEqual([]);
    });

    test("rejects a body with missing fields", async () => {
      const res = await routes.request("/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: "Groceries" }),
      });

      expect(res.status).toBe(400);
      expect(repository.notes).toEqual([]);
    });
  });
});
