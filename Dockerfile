# Dockerfile for PROD environment

# base image
FROM keymetrics/pm2:10-slim

# update packages and install dependencies
RUN apt-get update
RUN apt-get install ca-certificates python make g++ wget -y

# copy application and set permissions
RUN mkdir /home/node/communities-react-app
RUN chown node:node /home/node/communities-react-app
COPY --chown=node:node . /home/node/communities-react-app
WORKDIR /home/node/communities-react-app

# install npm dependencies
ENV NODE_ENV production
ENV NPM_CONFIG_LOGLEVEL warn
RUN npm install && npm run build

# update permission on the .next folder from build
RUN chown -R node:node ./.next
RUN chown -R node:node ./node_modules/.cache 

# download aws-env binary and set permissions
RUN wget -q https://github.com/Droplr/aws-env/raw/master/bin/aws-env-linux-amd64 -O /bin/aws-env
RUN chmod +x /bin/aws-env

# set environment variables for aws-env
ENV AWS_ENV_PATH /communities/react-app/qa1/
ENV AWS_REGION us-east-1

RUN NODE_ENV=test npm test

# expose port 8080 to listen for requests
ENV PORT 3000
EXPOSE 3000

# switch to user "node"
USER node

# inject environment variables and run pm2
CMD [ "/bin/bash", "-c", "eval $(aws-env) && pm2-runtime start ./.next/production-server/index.js" ]
