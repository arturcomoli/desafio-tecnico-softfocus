FROM node:16

WORKDIR /client

# RUN mkdir -p /client/node_modules/.vite && chown node:node /client/node_modules/.vite

COPY package*.json /client/

# RUN npm config set unsafe-perm true
# RUN npm install --location=global @npm8.1.3

# RUN npm install --location=global vite

RUN npm cache clean --force

RUN npm install

# RUN chown -R node.node /client
RUN chmod 777 node_modules

COPY . ./

EXPOSE 3000

# USER node

CMD ["npm", "run", "dev"]