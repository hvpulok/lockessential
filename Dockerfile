# Create image based on the official Node 6 image from the dockerhub
FROM node:8.11.3

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app


# Get all the code needed to run the app
COPY . .

# Install dependecies
RUN npm install

# Expose the port the app runs in
EXPOSE 8443
EXPOSE 8080

# Serve the app
CMD ["npm", "start"]