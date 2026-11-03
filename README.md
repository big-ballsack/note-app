# Note app


> [!TIP]
> **Getting started**
> 
> ```sh
> git clone https://github.com/big-ballsack/note-app # clone the project
> cd note-app # move into it
> pnpm i # install dependencies
> pnpm dev # start the services
> ```

> [!NOTE]
> **Requirements**
>
> - Node.js 26 or newer
> - pnpm 9 or newer

> [!NOTE]
> **Project structure**
>
> ```sh
> .
> ├── services/
> │   ├── backend/            # Hono API server
> │   │   └── src/
> │   │       └── index.ts    # server entry point
> │   └── frontend/           # React app built with Vite
> │       ├── index.html      # HTML entry
> │       ├── vite.config.ts  # Vite config
> │       └── src/
> │           ├── main.tsx    # React entry point
> │           └── App.tsx     # root component
> ├── shared/                 # shared workspace packages (empty for now)
> ├── package.json            # root scripts: dev, build, typecheck
> ├── pnpm-workspace.yaml     # workspace config (services/*, shared/*)
> └── tsconfig.base.json      # shared TypeScript config
> ```
