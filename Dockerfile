FROM node:18-alpine

WORKDIR /app

COPY . .
COPY package.json ./
COPY .env.local ./.env.local

RUN npm install
RUN npm install @dqbd/tiktoken

CMD ["npm", "run", "docker"]
