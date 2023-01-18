FROM node:18-alpine
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . ./
RUN npm run build
RUN npm install -g serve
EXPOSE 8000
EXPOSE 3000
CMD ["serve", "-s", "build"]
