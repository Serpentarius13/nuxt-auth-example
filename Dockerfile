# Базовый образ для сборки

ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine AS base 

ARG PORT=3000

WORKDIR /app

# Билд приложения 

FROM base AS builder 

COPY package.json package-lock.json ./
RUN npm install
COPY . . 

RUN npm run build
RUN npm prune

ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma migrate deploy

# Старт приложения

FROM base

ENV PORT=${PORT}
COPY --from=builder /app/.output /app/.output

CMD ["node", "/app/.output/server/index.mjs"]

EXPOSE 3000