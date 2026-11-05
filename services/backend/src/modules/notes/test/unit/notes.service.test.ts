import { beforeEach, describe, expect, test } from "bun:test";
import { InMemoryNotesRepository } from "../../notes.repository";
import { RealNotesService } from "../../notes.service";

describe("RealNotesService", () => {
  let repository: InMemoryNotesRepository;
  let service: RealNotesService;

  beforeEach(() => {
    repository = new InMemoryNotesRepository();
    service = new RealNotesService(repository);
  });

  describe("findAllByAuthorId", () => {
    test("returns only the notes of the given author", async () => {
      const mine = await repository.create("alice", { title: "Mine", content: "a" });
      await repository.create("bob", { title: "Not mine", content: "b" });

      expect(await service.findAllByAuthorId("alice")).toEqual([mine]);
    });

    test("returns an empty list when the author has no notes", async () => {
      expect(await service.findAllByAuthorId("alice")).toEqual([]);
    });
  });

  describe("create", () => {
    test("stores the note under the given author", async () => {
      const note = await service.create("alice", { title: "Groceries", content: "Milk" });

      expect(note).toEqual({
        id: expect.any(String),
        title: "Groceries",
        content: "Milk",
        authorId: "alice",
      });
      expect(repository.notes).toEqual([note]);
    });
  });
});
