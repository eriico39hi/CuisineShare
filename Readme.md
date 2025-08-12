# App Description


# Setup Instructions

# 1. Install dependencies

On the main terminal, run the code below to install frontend and backend dependencies.

For frontend, run:  
<br>`cd client` &nbsp; &nbsp; (use ../client if you are in the server folder)
<br>`npm install`


For backend, run:   
<br>`cd server` &nbsp; &nbsp; (use ../server if you are in the client folder)
<br>`npm install`

# 2. Update Environment Variables

In the the .env file inside the server/ directory, edit the MONGODB_URI and JWT_SECRET fields with your own values. (Note: getting the mongoDB connection string requires a mongodb account)

<br>`MONGODB_URI= mongodb_connection_string`
<br>(e.g. mongodb+srv://<db_username>:<db_password>@cluster0.etbixwo.mongodb.net/CuisineShare)
<br>`PORT=3000`
<br>`JWT_SECRET= jwt_secret` &nbsp; &nbsp; (This can be any string)


# 3. Start the server

On the main terminal, run the code below to start the server.

<br>`cd server`
<br>`node index.js`


# 4. Start the client and View Website

Open a second terminal and run the code below to start the client.

<br>`cd client`
<br>`npm run dev`

You should see a similar link (See below) on the terminal to view the site. Ctrl+LeftClick the link to visit and view the web application
[http://localhost:5173](http://localhost:5173)



# API Endpoints

| Method | Route                    | Description                                   |
|--------|--------------------------|-----------------------------------------------|           
| POST   | /api/auth/register       | Register a new user                           |
| POST   | /api/auth/login          | Log in and receive JWT                        |
| POST   | /api/newrecipe           | Create and submit new recipe                  |
| GET    | /api/allrecipes          | Get all recipes from mongoDB                  |
| GET    | /api/myrecipes           | Get user's created recipes                    |
| GET    | /api/favrecipes          | Get user's favorited recipes                  |
| GET    | /api/view/:recipeID      | Get all data for a single recipe              |
| POST   | /api/addfavorite         | Adds recipe ID to favorites array in user DB  |