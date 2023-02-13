FROM node:18

# Add arguments from docker-compose file
ARG APP_PORT
ARG MONGO_INITDB_ROOT_USERNAME
ARG MONGO_INITDB_ROOT_PASSWORD
ARG MONGO_ENDPOINT
ARG API_SECRET
ARG JWT_SIGNATURE_EXPIRE_TIME

# Add important environment variables that the app-server will use
ENV APP_PORT=${APP_PORT}
ENV MONGO_USER=${MONGO_INITDB_ROOT_USERNAME}
ENV MONGO_PASSWORD=${MONGO_INITDB_ROOT_PASSWORD}
ENV MONGO_ENDPOINT=${MONGO_ENDPOINT}
ENV API_SECRET=${API_SECRET}
ENV JWT_SIGNATURE_EXPIRE_TIME=${JWT_SIGNATURE_EXPIRE_TIME}

# Add dependencies for the node modules (to be installed)
COPY ["package.json", "package-lock.json", "/usr/src/"]

# Specify working directory for the container
WORKDIR /usr/src

# Install node dependencies via npm
RUN npm install

# Add main app functionalities
COPY ["app.js", "/usr/src/"]
COPY ["./controllers/auth.controller.js", "/usr/src/controllers/"]
COPY ["./middlewares/authJWT.js", "/usr/src/middlewares/"]
COPY ["./models/user.js", "/usr/src/models/"]
COPY ["./routes/home.js", "./routes/users.js", "./routes/data.js", "/usr/src/routes/"]

# Main node entrypoint
CMD ["node", "app.js"]
