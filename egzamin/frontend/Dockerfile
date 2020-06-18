FROM node:alpine

WORKDIR /opt/app

COPY package.json .

RUN yarn install

COPY . .

RUN yarn build

FROM nginx

COPY /opt/app/build /usr/share/nginx/html
