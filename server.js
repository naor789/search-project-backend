const express = require('express')
const app = express()
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors')
const router = require('./routes/EmployeeRouter')
dotenv.config();

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
    origin: process.env.APP_URL
}))

const port = process.env.PORT
const uri = process.env.MONGODB_URI


mongoose.set("strictQuery", false)
mongoose.connect(uri,
    {
        useNewUrlParser: true,
    }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use('/', router)

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
