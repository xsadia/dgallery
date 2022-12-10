FROM node:16.15.0

WORKDIR /usr/src

COPY . .

RUN yarn

EXPOSE 3000

CMD ["yarn", "dev"]