FROM node:22-alpine

# Install openssl for Prisma
RUN apk add --no-cache openssl

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
# Generate prisma client
RUN npx prisma generate

COPY src ./src/

EXPOSE 5000

# We use the standard start command defined in package.json
CMD ["npm", "start"]
