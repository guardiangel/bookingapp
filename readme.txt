20230209:
1.Init the project 
    npm install -g create-react-app
    npx create-react-app bookingapp
2. Add express
    yarn add express 
3. Change "start":"react-scripts start" to "start": "node index.js",
4. Create index.js and Run it.
    yarn start 
5. Open another console and add nodemon (don't need to start server manually with nodemon, 
        need to change "start": "node index.js" to "start": "nodemon index.js")
    yarn add nodemon
6. Install MongoDb and Client

7. Add dotenv
    yarn add dotenv
8. Add mongoose
    yarn add mongoose 
9. Connect to local MongoDb, if localhost doesn't work in .env file, try to replace localhost to 0.0.0.0

10. Push to github
    Ctrl + Shift + P, then Publish to GitHub 

