FROM node:14.4.0-alpine3.11

WORKDIR /api

COPY api/package.json api/yarn.lock ./

RUN yarn install

COPY api/ ./

CMD yarn dev