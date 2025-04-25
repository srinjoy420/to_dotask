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

Frontend Setup with Vite (Step 17 onward)
17. Initialize Frontend with Vite

bash
Copy
Edit
npm create vite@latest frontend
Choose the framework (e.g., React)

Name the project: frontend

18. Navigate to the frontend folder and install dependencies

bash
Copy
Edit
cd frontend
npm install
19. Setup folder structure inside frontend/src/:

css
Copy
Edit
megaproject/
├── .env
├── .gitignore
├── package.json
├── README.md
├── app.js
├── index.js
├── constants/
│   └── constants.js
├── controllers/
│   ├── auth.controller.js
│   ├── healthcheck.controller.js
│   ├── note.controller.js
│   ├── project.controller.js
│   └── task.controller.js
├── db/
│   └── indexdb.js
├── middlewares/
│   ├── auth.middleware.js
│   ├── multer.middleware.js
│   └── validator.middleware.js
├── models/
│   ├── member.model.js
│   ├── note.model.js
│   ├── project.model.js
│   ├── subtask.model.js
│   ├── task.model.js
│   └── user.model.js
├── routes/
│   ├── auth.routes.js
│   ├── healthcheck.routes.js
│   ├── note.routes.js
│   ├── project.routes.js
│   └── task.routes.js
├── utils/
│   ├── api-response.js
│   ├── appError.js
│   ├── asyncHandler.js
│   ├── constants.js
│   └── mail.js
├── validators/
│   └── index.validator.js
└── src/frontend/
    ├── components/
    │   ├── Login.jsx
    │   ├── Logout.jsx
    │   ├── Profile.jsx
    │   └── Signup.jsx
    
    ├── services/
    │   └── apiClient.js
    ├── App.jsx
    ├── main.jsx
    └── index.css

20. Install React Router

bash
Copy
Edit
npm install react-router-dom
Set up routing in main.jsx:

jsx
Copy
Edit
import { BrowserRouter, Routes, Route } from "react-router-dom";
21. Setup API client Create apiClient.js inside services/ for making backend API calls using fetch.

22. Enable Cookies for Auth Install cookie support:

bash
Copy
Edit
npm install js-cookie
23. Create .env for frontend

bash
Copy
Edit
VITE_API_URL=http://localhost:8000/api/v1
Access via import.meta.env.VITE_API_URL

24. Set up Authentication

Handle login/signup/logout/profile logic in apiClient.js.

Use useState, useEffect, and useNavigate hooks in components.




26. Run the Frontend

bash
Copy
Edit
npm run dev
