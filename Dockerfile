FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
COPY .lock/* ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "prod"]
