FROM node:18.15-alpine as base

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN --mount=type=cache,target=/root/.npm --mount=type=cache,target=/root/.cache npm ci

# ===============================

FROM base as frontend

COPY ./packages/frontend .

EXPOSE 4200

CMD ["npx", "nx", "serve", "frontend", "--hostname=0.0.0.0"]

# ===============================

FROM base as backend

COPY ./packages/backend .

EXPOSE 3333

CMD ["npx", "nx", "serve", "backend"]