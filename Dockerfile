# Stage 1: Build React application
FROM node:16 as build

WORKDIR /app

COPY package*.json ./
RUN yarn install

COPY . .

# Create the production build
RUN yarn build

# Stage 2: Serve the application using nginx
FROM nginx:alpine

# Copy the build output to the nginx html directory
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
