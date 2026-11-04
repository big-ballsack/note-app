# Build context: repository root (see compose.yaml)

FROM oven/bun:1.4.4-alpine AS build
WORKDIR /app
# Every workspace manifest is needed for a frozen lockfile
COPY package.json bun.lock ./
COPY services/backend/package.json services/backend/
COPY services/frontend/package.json services/frontend/
RUN bun install --frozen-lockfile --filter @note-application/frontend
COPY tsconfig.base.json ./
COPY services/frontend services/frontend
WORKDIR /app/services/frontend
RUN bun run build

# Serve the static build and proxy /api to the backend
FROM nginx:1.30-alpine AS runtime
COPY services/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/services/frontend/dist /usr/share/nginx/html
EXPOSE 80
