# Setup Instructions

# 1. Install dependencies

On the main terminal, run the code below to install frontend and backend dependencies.

For frontend, run:  
`cd client` &nbsp; &nbsp; (use ../client if you are in the server folder)
`npm install`


For backend, run:   
`cd server` &nbsp; &nbsp; (use ../server if you are in the client folder)
`npm install`

# 2. Update Environment Variables

In the the .env file inside the server/ directory, edit the MONGODB_URI and JWT_SECRET fields with your own values. (Note: getting the mongoDB connection string requires a mongodb account)


`MONGODB_URI= mongodb_connection_string` &nbsp; &nbsp;(e.g. mongodb+srv://<db_username>:<db_password>@cluster0.etbixwo.mongodb.net/StudentPortal)
`PORT=3000`
`JWT_SECRET= jwt_secret` &nbsp; &nbsp; (This can be any string)


# 3. Start the server

On the main terminal, run the code below to start the server.

`cd server`
`node index.js`


# 4. Start the client and View Website

Open a second terminal and run the code below to start the client.

`cd client`
`npm run dev`

You should see a similar link (See below) on the terminal to view the site. Ctrl+LeftClick the link to visit and view the web application
[http://localhost:5173](http://localhost:5173)