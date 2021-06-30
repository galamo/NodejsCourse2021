from node

# node_modules should be in .gitignore

WORKDIR /usr/app

COPY ./package.json .
COPY ./package-lock.json .

COPY ./.npmrc .

RUN npm install

CMD ["node index.js"]