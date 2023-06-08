FROM node:16
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
RUN npm install pm2 -g --unsafe-perm
USER node
COPY --chown=node:node . .
RUN ["chmod", "+x", "install-storefront.sh"]
RUN ["./install-storefront.sh", "v0.3.0"]
EXPOSE 4000
CMD [ "pm2-runtime", "process.json" ]
