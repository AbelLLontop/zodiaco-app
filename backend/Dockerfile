FROM node:18.19.0-alpine3.19 as base

WORKDIR /app

COPY package*.json . 

RUN npm ci

FROM base as build

COPY . .

RUN npm run build && npm prune --production

FROM base as production

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

EXPOSE 3000

CMD ["node","dist/index.js"]







