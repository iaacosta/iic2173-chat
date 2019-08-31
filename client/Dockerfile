FROM node:10.16.3

WORKDIR /var/www

COPY package.json yarn.lock ./

RUN yarn

COPY . ./

RUN yarn build
