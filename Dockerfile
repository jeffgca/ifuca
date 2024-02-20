FROM node:20-alpine

WORKDIR /app
COPY package.json .

RUN mkdir -p ./dist
RUN yarn install
RUN yarn build

# Bare neccesary
COPY src/ ./src
COPY dist ./dist
# COPY .env . # don't need this for D.O. apps

EXPOSE 3000

# Nu kör vi
CMD ["node" , "dist/index.js"]
