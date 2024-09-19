# Use the official Node.js image as a base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Next.js application
# RUN npm run dev 

# Expose the port that the app runs on
EXPOSE 3000

# Start the Next.js application
# CMD ["npm","run", "dev"]
CMD ["npm", "run","dev", "--", "-H", "0.0.0.0"]

