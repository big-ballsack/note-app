import type { Note, NoteRequestDTO } from "@note-application/types";
import type { PrismaClient } from "../../generated/prisma/client";

export interface NotesRepository {
  findAllByAuthor(authorId: string): Promise<Note[]>;
  create(authorId: string, note: NoteRequestDTO): Promise<Note>;
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

  create(authorId: string, note: NoteRequestDTO): Promise<Note> {
    return this.db.note.create({
      data: { title: note.title, content: note.content, authorId },
      select: this.noteFields,
    });
  }
}
