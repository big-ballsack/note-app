
FROM oven/bun:1.4.4-alpine AS build
WORKDIR /app
COPY package.json bun.lock ./
COPY services/backend/package.json services/backend/
COPY services/frontend/package.json services/frontend/
COPY shared/types/package.json shared/types/
RUN bun install --frozen-lockfile --filter @note-application/frontend
COPY tsconfig.base.json ./
COPY shared/types shared/types
COPY services/frontend services/frontend
WORKDIR /app/services/frontend
RUN bun run build

FROM nginx:1.30-alpine AS runtime
COPY services/frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/services/frontend/dist /usr/share/nginx/html
EXPOSE 80
