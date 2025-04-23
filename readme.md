1.npm install and install essential
2. create a file .prettierrc.json
    it is pure json file
    it standerize the project 
3.create a env file
4.create a public folder and the image folder inside that  and then a file ".gitkeep"
    it empty file
5.create a src here all the source coede
    and all folders db models routes utils controller validators  middleware and  two file app.js and index.js
 we create constants on utils 
    app.js is a  js for index for better code organization

6.define error and response in two files  apperror.js and api-response.js in utlis folder and constants.js fron constants
 we create hash password on user.model.js
******************// always import the data with the same name as  the ecport********************

7 we create hethcheck conreoller and its routes 

8 in app.js we create the route of helthcheck

*** all helthcheck function is not a single function its just a utility standalone function that connect with routes and routes are using express

9. we create a Async handeder on utils folder astncHndeler .js it return a promise and resolve that or throw an error it avids the try catch block

10. then in auth controller we import asynchandeler for our registeeUser route
11.create a validator folder then indexval,js 
now import express validate then directily get the body then create a function then validate using the body

12.create a validator.middleware.js in middlewares
it givies us validation results it also use express 

13.in auth routes we import validator and middleware to validate data for user registration
14.create mailjs with mail gen to generate the mails in utils name mail.js

15 express dont have fil managing

16. file handelig in middleweare create a miulter.js and import multer for file uploading