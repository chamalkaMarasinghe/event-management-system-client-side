# Stage 1: Build React App
FROM node:18-alpine AS build

ENV NODE_OPTIONS=--max-old-space-size=4096

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./

RUN npm install --legacy-peer-deps
# RUN npm install

# Copy the rest of the app files and build the app
COPY . .
RUN npm run build

# Stage 2: Serve React App with Nginx
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy the Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/

# Copy React build files to Nginx's web root
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]