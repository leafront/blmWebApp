FROM daocloud.io/blm_backend/blm-docker-node:4.2.0

WORKDIR /usr/src/app/

COPY package.json /usr/src/app/
RUN cd /usr/src/app/
RUN cat /root/.npmrc
RUN echo "//registry.npmjs.org/:_authToken=eb89e75a-7043-4921-8807-43ac723c8d0a" > /root/.npmrc
RUN npm install
COPY . /usr/src/app/

EXPOSE 8082

ENTRYPOINT npm start
