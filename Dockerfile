FROM node:latest
WORKDIR /app
COPY package*.json /app
RUN yarn install
COPY . /src/app
ENV PORT = 8080
EXPOSE 8080
CMD ["yarn", "run","dev"]

//CHOOSE

FROM node:9-slim
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
CMD ["npm", "start"]
