FROM node:20-alpine as development

WORKDIR /usr/src/app

COPY package*.json .
COPY prisma ./prisma/

RUN npm install

RUN npm install -g ts-node

COPY . .

RUN npm run build

RUN npx prisma generate


