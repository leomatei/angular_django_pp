# Stage 1: Build the Angular application
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Copy the current directory contents into the container at /app
COPY . /app

# Install dependencies
RUN npm install

# Set the NODE_OPTIONS environment variable
ENV NODE_OPTIONS=--openssl-legacy-provider

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --prod

# # Stage 2: Serve the application with Nginx
# FROM nginx:alpine

# # Copy the built Angular application from the build stage
# COPY --from=build /app/dist/frontend /usr/share/nginx/html


# Expose port 4200
EXPOSE 4200

# Run ng serve when the container launches
CMD ["npm", "start"]