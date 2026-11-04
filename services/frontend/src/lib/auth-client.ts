import { createAuthClient } from "better-auth/react";

// No baseURL: the API is served from the same origin (Vite proxy in dev, nginx in production)
export const authClient = createAuthClient();
