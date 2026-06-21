FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5173

# Run vite dev server on all network interfaces
CMD ["npm", "run", "dev", "--", "--host"]
