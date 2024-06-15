FROM node:18.19.0-alpine3.19 as vite-app

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY . .

ARG VITE_BACKEND_URL
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}

RUN npm run build

FROM nginx:1.21.3-alpine

WORKDIR /usr/share/nginx

COPY --from=vite-app /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]

