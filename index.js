import Express from "express";
import mongoose, {mongo} from "mongoose";
import {config} from "dotenv";
import userRoute from "./src/routes/userRoute.js";
import express from "express";
import cors from "cors"
import session from "express-session";


config()
const url = process.env.MONGO_URI;
const app = Express()
const port = 3000

const corsOption={
    origin: '*',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
    credentials: true,
    maxAge: 3600,
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOption))
app.use(session({
    secret:'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure:true}
}))


app.use('/', userRoute)

mongoose.connect(url) // Removed 'setTimeout' and fixed 'connect' method usage
    .then(() => {
      app.listen(port, () => {
        console.log(`Server Up and Running on port: http://localhost:${port}`);
      });
    })
    .catch(err => {
      console.error('Error connecting to the database', err);
      process.exit(1);
    });

