FROM dockerfile/nodejs
MAINTAINER Jon Eisen <jon@joneisen.me>

# Prep container with basics
EXPOSE 3000
WORKDIR /app

# Install nodemon
RUN npm install -g nodemon

# Install package dependencies
ADD package.json /data/package.json
RUN cd /data && npm install

# Replace dependencies with docker container's (for arch support)
# Run nodemon to restart on changes
CMD rm -rf node_modules && \
    ln -s /data/node_modules node_modules && \
    nodemon --ext js,css,html