const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 9000
app.use(cors());

// db connection
const dbConnection = require('./New-Server/db/dbConfig');

// testing whether it is listening or not
app.get('/', (req, res) => {
    res.send('welcome');
});

// user routes middleware file
const userRoutes = require("./New-Server/routes/userRoute");
// question routes middleware file
const questionRoutes = require("./New-Server/routes/questionRoute");
// authentication middleware
const authMiddleware = require('./New-Server/middleware/authMiddleware');

// json middleware
app.use(express.json());

// user routes middleware
app.use("/api/users", userRoutes);
// questions routes middleware

app.use("/api/questions", (req, res, next) => {
    console.log("Request received at /api/questions");
    next();
}, questionRoutes); // Use questionRoutes without authMiddleware here

// Commented out MySQL-specific code
// async function start() {
//     try {
//         const result = await dbConnection.execute("select 'test'");
//         // console.log(result)
//         app.listen(port)
//         console.log("database connection established")
//         console.log(`listening on ${port}`)
//     } catch (error) {
//         console.log(error.message)
//     }
// }

async function start() {
    try {
        // Connect to MongoDB
        await dbConnection();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        console.log("MongoDB connection established");
    } catch (error) {
        console.log(error.message);
    }
}

start();
