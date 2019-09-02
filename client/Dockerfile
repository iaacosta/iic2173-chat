FROM node:10.16.3

WORKDIR /app

COPY . /app

RUN mkdir /var/www

CMD yarn install && yarn build && mv /app/build/* /var/www
