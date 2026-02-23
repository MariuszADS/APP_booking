FROM node:20-apline

WORKDIR booking_/server

COPY package*.json ./

RUN  npm install

COPY . .

RUN npx prisma generate

EXPOSE 8080

CMD ["node","./booking_/server/index.js"]


