FROM node:16.15.0

WORKDIR /app

COPY . .

RUN yarn

EXPOSE 3000

CMD ["/bin/sh", "-c", "sleep 20 && yarn database:migrate init && yarn database:generate && yarn dev"]