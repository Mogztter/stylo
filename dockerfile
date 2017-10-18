FROM node

ADD sails /sails
ADD front /front

RUN npm install -g n
RUN n stable
RUN npm install npm@latest -g

RUN cd /front; npm i
RUN cd /sails; npm i

WORKDIR /sails

EXPOSE 80
CMD ["npm","run","dist"]
