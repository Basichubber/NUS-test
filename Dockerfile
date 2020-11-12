$ docker --version
Docker version 19.03.8, build afacb8b   
# pull official base image
FROM node:latest

RUN mkdir -p /usr/src/app
# set working directory
WORKDIR /usr/src/app

# install app dependencies
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install

ADD src /usr/src/app/src
ADD public /usr/src/app/public

RUN npm build
# start app
CMD ["npm", "start"]   
