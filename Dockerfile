# Базовый образ для сборки

ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine AS base 

ARG DATABASE_URL
ENV DATABASE_URL ${DATABASE_URL}

ARG NUXT_OAUTH_GOOGLE_CLIENT_ID
ENV NUXT_OAUTH_GOOGLE_CLIENT_ID ${NUXT_OAUTH_GOOGLE_CLIENT_ID}

ARG NUXT_OAUTH_GOOGLE_CLIENT_SECRET
ENV NUXT_OAUTH_GOOGLE_CLIENT_SECRET ${NUXT_OAUTH_GOOGLE_CLIENT_SECRET}

ARG NUXT_SESSION_PASSWORD
ENV NUXT_SESSION_PASSWORD ${NUXT_SESSION_PASSWORD}

ARG PORT=3000

WORKDIR /app

# Билд приложения 

FROM base AS builder 

COPY package.json package-lock.json ./
RUN npm install
COPY . . 

RUN npx prisma migrate deploy
RUN npx prisma generate
RUN npm run build
RUN npm prune

# Старт приложения

FROM base

ENV PORT=${PORT}
COPY --from=builder /app/.output /app/.output

CMD ["node", "/app/.output/server/index.mjs"]

EXPOSE 3000