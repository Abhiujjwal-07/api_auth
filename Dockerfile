FROM node:17.6.0
WORKDIR /AUTH
COPY . /AUTH/
RUN npm install
COPY . /AUTH/
CMD ["npm", "start"]


