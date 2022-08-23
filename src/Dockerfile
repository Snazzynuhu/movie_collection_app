FROM node:16

WORKDIR /app

COPY . .

RUN yarn 

RUN npx tsc

RUN node bin/www

CMD ["node", "bin/www"]



