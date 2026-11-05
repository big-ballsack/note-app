import type { AppType } from "@note-application/backend/app";
import { hc } from "hono/client";

export const api = hc<AppType>(window.location.origin).api;
