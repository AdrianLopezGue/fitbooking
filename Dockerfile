FROM node:18.15-alpine as base

WORKDIR /app

COPY ./package.json ./package-lock.json ./

RUN --mount=type=cache,target=/root/.npm --mount=type=cache,target=/root/.cache npm ci

# ===============================

FROM base as frontend

COPY ./packages/frontend .

EXPOSE 3000

CMD ["npx", "nx", "run", "frontend:serve", "--hostname=0.0.0.0", "--port=3000"]

# ===============================

FROM base as backend

COPY ./packages/backend .

EXPOSE 3333

CMD ["npx", "nx", "serve", "backend"]