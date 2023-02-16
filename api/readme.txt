How to start the forent-end server and back-end server.
1.Install Mongodb and start it.
2.bookingapp>yarn start
3.bookingapp\client>yarn start





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


20230210 
1. Add route and Model

20230212
1. Encrypt the password
2. Use Jwt token in authController.js 
        yarn add jsonwebtoken
        yarn add cookie-parser
    2.1 Install openssl for windows and add path to system path variable.
    2.2 Execute 
        openssl rand -base64 32

20230214 Add Client
    cd client 
    git clone --single-branch -b "react-booking-ui" https://github.com/safak/youtube2022.git .

20230215 Add axios
    cd client
    yarn add axios