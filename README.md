# Note app


> [!TIP]
> **Getting started**
> 
> ```sh
> git clone https://github.com/big-ballsack/note-app # clone the project
> cd note-app # move into it
> bun install # install dependencies
> cp services/backend/.env.example services/backend/.env # local env
> docker compose -f compose.dev.yaml up -d # start the local database
> bun dev # start the services (Turborepo TUI)
> ```

> [!NOTE]
> **Requirements**
>
> - Bun 1.4 or newer
> - Docker with Compose

> [!NOTE]
> **Deployment**
>
> ```sh
> POSTGRES_PASSWORD=... docker compose up -d --build # db, migrations, backend, frontend on :8080
> ```
>
> Optional: `POSTGRES_USER`, `POSTGRES_DB`, `FRONTEND_PORT`. The password ends up in a URL, so URL-encode special characters.

> [!NOTE]
> **Project structure**
>
> ```sh
> .
> ├── services/
> │   ├── backend/            # Hono API server (Bun.serve)
> │   │   ├── Dockerfile
> │   │   ├── prisma/         # Prisma schema + migrations
> │   │   └── src/
> │   │       └── index.ts    # server entry point
> │   └── frontend/           # React app built with Vite
> │       ├── Dockerfile      # Vite build, served by nginx
> │       ├── nginx.conf      # static files + /api proxy
> │       ├── index.html      # HTML entry
> │       ├── vite.config.ts  # Vite config
> │       └── src/
> │           ├── main.tsx    # React entry point
> │           └── App.tsx     # root component
> ├── shared/                 # shared workspace packages (empty for now)
> ├── package.json            # root scripts + workspaces (services/*, shared/*)
> ├── compose.yaml            # production stack
> ├── compose.dev.yaml        # local database only
> ├── turbo.json              # Turborepo task pipeline (TUI mode)
> ├── bun.lock                # Bun lockfile
> └── tsconfig.base.json      # shared TypeScript config
> ```
