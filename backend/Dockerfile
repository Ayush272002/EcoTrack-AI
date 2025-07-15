FROM node:22.12.0

WORKDIR /app

COPY package*.json ./

RUN npm install

# Install TypeScript globally for building
RUN npm install -g typescript

COPY . .

RUN npm run build

EXPOSE 8000

CMD ["node", "dist/index.js"]    