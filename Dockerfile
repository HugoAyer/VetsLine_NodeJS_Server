FROM node:16.0.0

WORKDIR /src/usr/app

COPY . .
RUN npm install

EXPOSE 7195

CMD ["node", "index.js"]