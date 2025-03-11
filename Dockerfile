FROM node:20-alpine

#RUN mkdir /app
#RUN echo "node modules installed"
#RUN pwd && ls

WORKDIR /app
COPY . .
#RUN echo "node modules installed"
#RUN pwd && ls

RUN npm install
#RUN echo "node modules installed"
#RUN pwd && ls

RUN npm run build
#RUN echo "built"
#RUN pwd && ls

EXPOSE 3000

CMD ["npm", "start"]
