FROM node:boron

WORKDIR /opt/channel/client
VOLUME /opt/channel/assets

COPY ./package.json /tmp/package.json
RUN cd /tmp && npm install --loglevel warn
RUN mv /tmp/node_modules /opt/channel/node_modules
ENV PATH /opt/channel/node_modules/.bin:$PATH

COPY . /opt/channel/client

ENTRYPOINT ["npm", "run"]
CMD ["start"]
