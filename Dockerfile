# Базовый образ для сборки

ARG NODE_VERSION=20
ARG name=nuxt-app

FROM node:${NODE_VERSION}-alpine AS base 

ARG PORT=3000
ENV NODE_ENV=production

WORKDIR /app

# Билд приложения 

FROM base AS builder 

COPY package.json pnpm-lock.yaml ./
RUN npm install --omit=dev
COPY . . 

RUN npm run build
RUN npm prune

# Старт приложения

FROM base

ENV PORT=${PORT}
COPY --from=builder /app/.output /app/.output

CMD ["node", "/app/.output/server/index.mjs"]
EXPOSE ${PORT}