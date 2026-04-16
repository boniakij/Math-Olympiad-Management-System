FROM node:22-alpine

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./

RUN npm ci

COPY frontend/. .
COPY docker/frontend/start.sh /usr/local/bin/frontend-start

RUN chmod +x /usr/local/bin/frontend-start

EXPOSE 5173

CMD ["sh", "/usr/local/bin/frontend-start"]
