import { db } from "../../lib/db";
import { NotesController } from "./notes.controller";
import { NotesMapper } from "./notes.mapper";
import { PrismaNotesRepository } from "./notes.repository";
import { RealNotesService } from "./notes.service";

export function notesModule() {
  const repository = new PrismaNotesRepository(db);
  const service = new RealNotesService(repository);
  const mapper = new NotesMapper();
  const controller = new NotesController(service, mapper);

  return controller.routes;
}
