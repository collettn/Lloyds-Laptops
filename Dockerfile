FROM node:16-alpine

WORKDIR /usr/src/app
COPY ./ ./
RUN npm install
#RUN npm install mysql
#RUN npm install express-flash

EXPOSE 3000

CMD npm run start