import type { Note } from "@note-application/types";
import type { PrismaClient } from "../../generated/prisma/client";

export interface NotesRepository {
  findAllByAuthor(authorId: string): Promise<Note[]>;
}

export class PrismaNotesRepository implements NotesRepository {
  private readonly noteFields = {
    id: true,
    title: true,
    content: true,
    authorId: true,
  };

  constructor(private readonly db: PrismaClient) {}

  findAllByAuthor(authorId: string): Promise<Note[]> {
    return this.db.note.findMany({
      where: { authorId },
      select: this.noteFields,
    });
  }
}
