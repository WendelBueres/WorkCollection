FROM node:16.15.1

WORKDIR /app

COPY package.json /app

RUN yarn

COPY . .