const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");

const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");

const app = express();
dotenv.config();

/*mongoose.connect(process.env.MONGO_DB, ()=>{
    console.log("connected to MongoDB");
});*/

try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        process.env.MONGO_DB,
        { useNewUrlParser: true, useUnifiedTopology: true },
        () => console.log(" Mongoose is connected")
    );
} catch (e) {
    console.log("could not connect");
}

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

app.get("/", (req,res)=>{
   res.send("HelloWorld");
});

app.listen(8800, ()=>{
    console.log("server is running...");
});

