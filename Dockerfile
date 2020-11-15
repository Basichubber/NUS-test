FROM node:latest

RUN mkdir -p /usr/src/app
# set working directory
WORKDIR /usr/src/app

# install app dependencies
COPY package.json /usr

RUN npm install

COPY src /usr/src
ADD public /usr/src/app/src/public

RUN npm build
# start app
CMD ["npm", "start"]   
