FROM node:14.15-alpine AS builder

WORKDIR usr/src/app

COPY . .

RUN npm ci
RUN npm run build --quiet --no-audit
RUN npm prune --production

FROM node:14.15-alpine

WORKDIR usr/src/app

COPY --from=builder /usr/src/app .

CMD ["node", "./dist/main.js"]