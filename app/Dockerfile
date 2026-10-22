FROM node:20-alpine

ENV MONGO_DB_USERNAME=admin
ENV MONGO_DB_PWD=password

WORKDIR /home/app

COPY . /home/app

RUN npm install

EXPOSE 3000

CMD ["node", "server.js"]