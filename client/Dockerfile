FROM node:10.16.3

WORKDIR /app

COPY . /app

RUN mkdir /var/www

RUN yarn install && yarn build

RUN rm -rf /app/node_modules

CMD mv /app/build/* /var/www
