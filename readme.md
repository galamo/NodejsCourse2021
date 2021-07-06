# Async programing

- Callback
- Promise
- Async Await


# API
- Open folder
- run `npm init`
- `npm install express` 
- `npm install dotenv`
- `checkEnvParams`


# Typescript
## Configure Typescript

- `npm install -g typescript`
- `npm install ts-node`
- `npm install -g concurrently`
- `npm install nodemon -g`
`    "_run-all": "concurrently -k -p \"[{name}]\" -n \"TypescriptCompiler,application\" -c \"red.bold,yellow.bold,\" \"npm run build_watch\" \"npm run dev\"",
`

# Express 

- `npm install express`
- `npm install @types/express @types/node --save-dev`
- `npm install dotenv`



# Express Infra and Utils

# Cars Api

## infra folder
- contains the infrastructure functions for using express with wrapped functionality which gives the ability to control all request common flows in one place

## utils 
- contains common utils for the application, schemas Map and validations getter  

## Error Handler
- added the following code from the validation to summaries all bad requests  `return next({ ...new Error(), isBadReuqest: true })`
- in this way the client will not get unwanted leaked messages 

# Homework
## 1
- Add new Route to the CarsApi - Search ( the api will receive key and value, for example origin:USA ).
- The Api entry will return the relevant results based on the search key&value.

## 2
- Create New API Application with the following context: BankAccounts
- Bank Account Details:
    1. Account Number - string
    2. Account owners - Array of Strings
    3. Balance - number
    4. Created at - String ( Date UTC format )
- Create a  Script which generates such Accounts and writing them as JSON file in your project before Starting the applications.
Names can be fetched from: https://randomuser.me/ 

- Try to create the following API with the existing infra:
    1. Get Accounts
    2. Search Accounts ( by owners / bank number)
    




# Async programing

- Callback
- Promise
- Async Await


# API
- Open folder
- run `npm init`
- `npm install express` 
- `npm install dotenv`
- `checkEnvParams`


# Typescript
## Configure Typescript

- `npm install -g typescript`
- `npm install ts-node`
- `npm install -g concurrently`
- `npm install nodemon -g`
`    "_run-all": "concurrently -k -p \"[{name}]\" -n \"TypescriptCompiler,application\" -c \"red.bold,yellow.bold,\" \"npm run build_watch\" \"npm run dev\"",
`

# Express 

- `npm install express`
- `npm install @types/express @types/node --save-dev`
- `npm install dotenv`



# Express Infra and Utils

# Cars Api

## infra folder
- contains the infrastructure functions for using express with wrapped functionality which gives the ability to control all request common flows in one place

## utils 
- contains common utils for the application, schemas Map and validations getter  

## Error Handler
- added the following code from the validation to summaries all bad requests  `return next({ ...new Error(), isBadReuqest: true })`
- in this way the client will not get unwanted leaked messages 

# Homework
## 1
- Add new Route to the CarsApi - Search ( the api will receive key and value, for example origin:USA ).
- The Api entry will return the relevant results based on the search key&value.

## 2
- Create New API Application with the following context: BankAccounts
- Bank Account Details:
    1. Account Number - string
    2. Account owners - Array of Strings
    3. Balance - number
    4. Created at - String ( Date UTC format )
- Create a  Script which generates such Accounts and writing them as JSON file in your project before Starting the applications.
Names can be fetched from: https://randomuser.me/ 

- Try to create the following API with the existing infra:
    1. Get Accounts
    2. Search Accounts ( by owners / bank number)
    




# Thread - workers
- see example in `thread` branch

# Testing
- `npm install mocha -g`
- `npm install chai`

1. Creating our folder structure
2. Creating unit test
3. configure unit test first
4. configure integration test
5. background running
6. pipeline run
7. prepublish run


# Secure Code 


# Mysql
`npm i --save-dev types/mysql2#`
`npm i  mysql2`
`import mysql from "mysql2/promise";`



# Configure
- connection
```js
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'northwind'
});
```

- docker-compose

```yml
version: "3.7"

services:
   mysql:
    image: mysql:5.7
    container_name: mysql-dev
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: admin
    volumes:
      - "./mysql:/docker-entrypoint-initdb.d/:ro"

networks:
  default:
    name: dev_network

```

```js
connection.execute(
  'SELECT * FROM `table` WHERE `name` = ? AND `age` > ?',
  ['Rick C-137', 53],
  function(err, results, fields) {
    console.log(results); 
  }
```


## Next Lesson
- post a customer
- integration tes
- seperate controller and queries 


## Open issues 
- Try and Catch in Unit test
- Running API tests



## Homework
Before - make sure to load the sql scripts in your local database.
- install docker 
- go to dev-apps folder and run  `docker-compose up` 
1. Cover your server functionality writing with Unit Test
2. Create Api with the following functionality 
2.1 GET /products 
return the all products from products table
2.3 GET /products/:category
2.4 return the products by category
2.5 GET /orders?tax_rate=:number
2.6 return all the orders which higher then the given tax rate ( convert the tax to $)
3. Cover the Api's with integration test
4. print all the incoming payload 



# Integration tests
## Common issues
  1. par
  2. gar

