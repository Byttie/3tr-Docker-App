FROM node:18-alpine

ENV MONGO_DB_USERNAME=admin
ENV MONGO_DB_PWD=password

WORKDIR /home/app

COPY . /home/app

RUN npm install

CMD ["node", "server.js"]