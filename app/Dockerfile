FROM node:18

# Add dependencies for the node modules (to be installed)
COPY ["package.json", "package-lock.json", "/usr/src/"]

# Specify working directory for the container
WORKDIR /usr/src

# Install node dependencies via npm
RUN npm install

# Add main app functionalities
COPY ["app.js", "/usr/src/"]
COPY [".env", "/usr/src/"]
COPY ["./controllers/auth.controller.js", "/usr/src/controllers/"]
COPY ["./middlewares/authJWT.js", "/usr/src/middlewares/"]
COPY ["./models/user.js", "/usr/src/models/"]
COPY ["./routes/home.js", "./routes/users.js", "./routes/data.js", "/usr/src/routes/"]

# Main node entrypoint
CMD ["node", "app.js"]
