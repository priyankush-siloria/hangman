FROM node:10

LABEL version="1.0"
LABEL description="This is node app"

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 5000

CMD ["node", "app.js"]