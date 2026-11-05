import type { Note, NoteResponseDTO } from "@note-application/types";

export class NotesMapper {
  toNoteResponseDTO(note: Note): NoteResponseDTO {
    return {
      id: note.id,
      title: note.title,
      content: note.content,
      authorId: note.authorId,
    };
  }
}
