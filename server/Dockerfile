
FROM node:20 as build-stage

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Bundle app source
COPY . .

RUN npm install
RUN npm run build


# Your server port
EXPOSE 8080

CMD [ "npm", "run" ,"start" ]