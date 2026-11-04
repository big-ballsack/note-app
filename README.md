# Note app


> [!TIP]
> **Getting started**
> 
> ```sh
> git clone https://github.com/big-ballsack/note-app # clone the project
> cd note-app # move into it
> bun install # install dependencies
> bun dev # start the services (Turborepo TUI)
> ```

> [!NOTE]
> **Requirements**
>
> - Bun 1.4 or newer

> [!NOTE]
> **Project structure**
>
> ```sh
> .
> ├── services/
> │   ├── backend/            # Hono API server (Bun.serve)
> │   │   └── src/
> │   │       └── index.ts    # server entry point
> │   └── frontend/           # React app built with Vite
> │       ├── index.html      # HTML entry
> │       ├── vite.config.ts  # Vite config
> │       └── src/
> │           ├── main.tsx    # React entry point
> │           └── App.tsx     # root component
> ├── shared/                 # shared workspace packages (empty for now)
> ├── package.json            # root scripts + workspaces (services/*, shared/*)
> ├── turbo.json              # Turborepo task pipeline (TUI mode)
> ├── bun.lock                # Bun lockfile
> └── tsconfig.base.json      # shared TypeScript config
> ```
