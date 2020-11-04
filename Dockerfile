FROM hoosin/alpine-nginx-nodejs:latest as buildContainer

RUN ["mkdir", "/app"]

WORKDIR /app

COPY package.json .

RUN ["npm", "install", "--only=prod"]

COPY . .

RUN ["npm", "run", "build"]

RUN ["cp", "-av", "./build/.", "/usr/share/nginx/html"]

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

RUN ["nginx", "-t"]

CMD npm run serve && npm run start-server