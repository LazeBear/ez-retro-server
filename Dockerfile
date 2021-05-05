FROM node:14

RUN mkdir -p /app/server

WORKDIR /app/server

COPY . /app/server

RUN npm install --production

EXPOSE 3030

CMD npm start