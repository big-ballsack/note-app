import { z } from "zod";

export type Note = {
  id: string;
  title: string;
  content: string;
  authorId: string;
};

export type NoteRequestDTO = z.infer<typeof noteRequestSchema>;
export const noteRequestSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export type NoteResponseDTO = z.infer<typeof noteResponseSchema>;
export const noteResponseSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  authorId: z.string().min(1),
});
