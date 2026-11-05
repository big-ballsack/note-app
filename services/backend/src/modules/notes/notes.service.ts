import type { Note } from "@note-application/types";
import type { NotesRepository } from "./notes.repository";

export interface NotesService {
  findAllByAuthorId(authorId: string): Promise<Note[]>;
}

export class RealNotesService implements NotesService {
  constructor(private readonly repository: NotesRepository) {}

  async findAllByAuthorId(authorId: string): Promise<Note[]> {
    return await this.repository.findAllByAuthor(authorId);
  }
}
