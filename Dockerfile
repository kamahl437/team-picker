FROM mhart/alpine-node:latest
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
#Front end npm install, seems to currently be a dns issue for the install.  fix this and uncomment
#ADD /tp-frontend/package.json /tmp/tp-frontend/package.json
#RUN cd /tmp/tp-frontend && npm install
# //need to do the react build and move it in to the public folder
WORKDIR /opt/app
ADD . /opt/app
# same as above
#RUN cp -a /tmp/tp-frontend/node_modules /opt/app/tp-frontend
RUN cd /tmp/tp-frontend && npm build
RUN cp -a /opt/app/tp-frontend/build /opt/app/public
#actual port exposed through vmbox port forwarding is 3001
EXPOSE 3000

CMD ["npm", "start"]
