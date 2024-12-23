# Use a base image with Python and Node.js
FROM node:18-bullseye

# Install Python and pip
RUN apt-get update && apt-get install -y python3 python3-pip

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files and install Node.js dependencies
COPY package.json package-lock.json ./
RUN npm install

# Install Python dependencies
COPY requirements.txt ./  
RUN pip3 install -r requirements.txt

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the default port for your app
EXPOSE 3000

# Start the Next.js application in production mode
CMD ["npm", "run", "start"]
