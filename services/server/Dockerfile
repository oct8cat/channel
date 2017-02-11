FROM node:boron

WORKDIR /opt/channel/server
VOLUME /opt/channel/uploads

COPY ./package.json /tmp/package.json
RUN cd /tmp && npm install --loglevel warn
RUN mv /tmp/node_modules /opt/channel/node_modules
ENV PATH /opt/channel/node_modules/.bin:$PATH

COPY . /opt/channel/server

ENV PORT 3000
EXPOSE $PORT

ENTRYPOINT ["npm", "run"]
CMD ["start"]
