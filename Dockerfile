# Use the official Node.js image as a base
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Expose a port (if needed)
EXPOSE 3000

# Set an entrypoint script (this will run the correct job)
ENTRYPOINT ["sh", "-c", "node $FILE_TO_RUN"]
