FROM node:18.16-slim
WORKDIR /home/app
COPY back.js .
RUN npm init -y 
EXPOSE 4000
CMD [ "node", "back.js" ]
