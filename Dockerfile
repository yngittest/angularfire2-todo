FROM node

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

RUN npm -g config set user root
RUN npm -g install firebase-tools

EXPOSE 4200
