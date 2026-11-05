import { noteRequestSchema } from "@note-application/types";
import { Hono, type MiddlewareHandler } from "hono";
import type { AuthEnv } from "../../lib/middlewares/auth.middleware";
import { validate } from "../../lib/middlewares/validation.middleware";
import type { NotesMapper } from "./notes.mapper";
import type { NotesService } from "./notes.service";

export class NotesController {
  constructor(
    private readonly service: NotesService,
    private readonly mapper: NotesMapper,
    private readonly auth: MiddlewareHandler<AuthEnv>,
  ) {}

  routes() {
    return new Hono<AuthEnv>()
      .use(this.auth)

      .get("/", async (c) => {
        const currentUser = c.get("user");
        const notes = await this.service.findAllByAuthorId(currentUser.id);
        return c.json(notes.map((note) => this.mapper.toNoteResponseDTO(note)));
      })
      .post("/", validate("json", noteRequestSchema), async (c) => {
        const currentUser = c.get("user");
        const body = c.req.valid("json");
        const note = await this.service.create(currentUser.id, body);
        return c.json(this.mapper.toNoteResponseDTO(note), 201);
      });
  }
}
