FROM node:20.11.1 as build

RUN mkdir -p /var/www/html/
RUN mkdir -p /home/app
WORKDIR /home/app

COPY package.json /home/app/package.json
RUN npm install -g @angular/cli
RUN npm install

COPY . /home/app
RUN npm run build

FROM nginx:latest
RUN rm -rf /usr/share/nginx/html
COPY --from=build /home/app/dist/store-website/browser /usr/share/nginx/html
EXPOSE 80
