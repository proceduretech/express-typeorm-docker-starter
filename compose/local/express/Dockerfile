FROM node:8.14-alpine

RUN addgroup -S express \
  && adduser -S -G express express

RUN apk update \
  # psycopg2 dependencies
  && apk add --virtual build-deps gcc g++ make python musl-dev \
  && apk add postgresql-dev \
  # https://docs.djangoproject.com/en/dev/ref/django-admin/#dbshell
  && apk add postgresql-client
RUN npm install -g ts-node typescript nodemon pino-pretty

# Requirements are installed here to ensure they will be cached.
COPY package*.json ./
RUN npm install

COPY ./compose/local/express/start /start
RUN sed -i 's/\r//' /start
RUN chmod +x /start
RUN chown express /start

ADD ./scripts/nodeshell /usr/local/bin
ADD ./scripts/dbshell /usr/local/bin

COPY . /app
RUN chown -R express /app
USER express

WORKDIR /app