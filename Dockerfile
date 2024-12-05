FROM node:14
RUN apt-get update && apt-get install -y stress && apt-get clean
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["node", "index.js"]
