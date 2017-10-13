FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN apt-get update \
    && apt-get install -y chromium
ENV CHROME_BIN=chromium

RUN npm -g config set user root
RUN npm -g install firebase-tools

EXPOSE 4200
