FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Install a lightweight static server
RUN npm install -g serve

EXPOSE 3008

# Start the app on port 3008 (Single Page Application mode)
CMD ["serve", "-s", "dist", "-l", "3008"]
