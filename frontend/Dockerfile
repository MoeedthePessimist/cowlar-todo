# Set base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the frontend package.json file
COPY package.json ./

# Install dependencies
RUN yarn install

# Copy the entire frontend project directory to the container
COPY . .

# Build the frontend
RUN yarn build

