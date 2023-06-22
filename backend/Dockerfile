# Use a Node.js 16 base image
FROM node:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the backend package.json file
COPY package.json ./

# Install dependencies
RUN yarn install

# Copy the entire backend project directory to the container
COPY . .

# Set the command to run the backend server
CMD ["yarn", "start"]
