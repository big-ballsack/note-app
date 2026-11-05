
FROM oven/bun:1.4.4-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json bun.lock ./
COPY services/backend/package.json services/backend/
COPY services/frontend/package.json services/frontend/
COPY shared/types/package.json shared/types/
RUN bun install --frozen-lockfile --filter @note-application/backend

FROM deps AS build
COPY tsconfig.base.json ./
COPY shared/types shared/types
COPY services/backend services/backend
WORKDIR /app/services/backend
RUN DATABASE_URL=postgres://build:build@localhost:5432/build bun run generate && bun run build

FROM base AS runtime
ENV NODE_ENV=production
COPY --from=build /app/services/backend/dist ./
USER bun
EXPOSE 3000
CMD ["bun", "index.js"]
