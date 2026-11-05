import { Hono } from "hono";
import { type AuthEnv, requireAuth } from "../../lib/middlewares/auth.middleware";
import type { NotesMapper } from "./notes.mapper";
import type { NotesService } from "./notes.service";

export class NotesController {
  private readonly router = new Hono<AuthEnv>().use(requireAuth);

  constructor(
    private readonly service: NotesService,
    private readonly mapper: NotesMapper,
  ) {}

  public routes = this.router.get("/", async (c) => {
    const currentUser = c.get("user");
    const notes = await this.service.findAllByAuthorId(currentUser.id);
    return c.json(notes.map(this.mapper.toNoteResponseDTO));
  });
}
