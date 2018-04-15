FROM mhart/alpine-node:latest
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
# //need to do the react build and move it in to the public folder
WORKDIR /opt/app
ADD . /opt/app

EXPOSE 3000

CMD ["npm", "start"]
