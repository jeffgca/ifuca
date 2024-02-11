FROM node:20-alpine

WORKDIR /app
COPY package.json .

RUN yarn install
RUN yarn build

# Bare neccesary
COPY src/ ./src
COPY dist ./dist
COPY .env .

EXPOSE 3000

# Nu kör vi
CMD ["node" , "dist/index.js"]
