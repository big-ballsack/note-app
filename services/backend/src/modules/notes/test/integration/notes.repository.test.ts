import { beforeEach, describe, expect, test } from "bun:test";
import { db } from "../../../../lib/db";
import { createTestUser } from "../../../../lib/fixtures/users";
import { PrismaNotesRepository } from "../../notes.repository";

describe("PrismaNotesRepository", () => {
  const repository = new PrismaNotesRepository(db);
  let alice: string;
  let bob: string;

  beforeEach(async () => {
    alice = await createTestUser();
    bob = await createTestUser();
  });

  describe("create", () => {
    test("persists the note and returns it with a generated id", async () => {
      const note = await repository.create(alice, { title: "Groceries", content: "Milk" });

      expect(note).toEqual({ id: expect.any(String), title: "Groceries", content: "Milk", authorId: alice });
      expect(await db.note.findUnique({ where: { id: note.id } })).toEqual(note);
    });
  });

  describe("findAllByAuthor", () => {
    test("returns only the notes of the given author", async () => {
      const first = await repository.create(alice, { title: "First", content: "a" });
      const second = await repository.create(alice, { title: "Second", content: "b" });
      await repository.create(bob, { title: "Not alice's", content: "c" });

      const notes = await repository.findAllByAuthor(alice);

      expect(notes).toHaveLength(2);
      expect(notes).toEqual(expect.arrayContaining([first, second]));
    });

    test("returns an empty list when the author has no notes", async () => {
      expect(await repository.findAllByAuthor(alice)).toEqual([]);
    });
  });
});
