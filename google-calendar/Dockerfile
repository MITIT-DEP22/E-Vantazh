FROM node:18

RUN apt-get update && apt-get install -y tzdata

RUN ln -fs /usr/share/zoneinfo/Europe/Kyiv /etc/localtime

RUN dpkg-reconfigure --frontend noninteractive tzdata

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8091

CMD [ "node", "app.js" ]