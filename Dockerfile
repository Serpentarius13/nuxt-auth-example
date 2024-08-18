# Базовый образ для сборки

ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine AS base 

ENV NODE_OPTIONS=--max_old_space_size=4096

ARG PORT=3000

WORKDIR /app

# Билд приложения 

FROM base AS builder 

COPY package.json package-lock.json ./
RUN npm install
COPY . . 

RUN npm run build
RUN npm prune
RUN npx prisma migrate deploy

# Старт приложения

FROM base

ENV PORT=${PORT}
COPY --from=builder /app/.output /app/.output

CMD ["node", "/app/.output/server/index.mjs"]

EXPOSE 3000