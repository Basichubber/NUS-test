FROM node:latest

RUN mkdir -p /usr/src/app
# set working directory
WORKDIR /usr/src/app

# install app dependencies
COPY package.json /usr/src/app

RUN npm install

ADD src /usr/src/app/src
ADD public /usr/src/app/src/public

RUN npm build
# start app
CMD ["npm", "start"]   
