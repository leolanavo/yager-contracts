FROM node:14.4.0-alpine3.11

ENV MONGO_URL="mongodb://mongodb:27017/yager"
ENV POSTGRES_URL="postgresql://postgres:5432/yager"
ENV NEO4J_URL="neo4j://neo4j:"
ENV API_PORT=3000

WORKDIR /api

COPY api/package.json api/yarn.lock ./

RUN yarn install

COPY api/ ./

CMD yarn dev