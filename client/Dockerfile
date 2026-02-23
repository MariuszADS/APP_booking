FORM node:20-apline

WORKDIR /booking_/client

COPY package*.json

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm","run","dev"]
