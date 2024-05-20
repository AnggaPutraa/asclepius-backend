FROM node:18.16.0 as builder

WORKDIR /usr/src/app

ENV HOST 0.0.0.0

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:18.16.0

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install --omit=dev

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]