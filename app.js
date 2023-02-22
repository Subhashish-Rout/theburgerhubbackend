import express, { urlencoded } from "express";
import dotenv from "dotenv";
import { connectPassport } from "./utils/Provider.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
export default app;

dotenv.config({
  path: "./config/config.env",
});

//Using Middleware

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
      secure: process.env.NODE_ENV === "development" ? false : true,
      httpOnly: process.env.NODE_ENV === "development" ? false : true,
      sameSite: process.env.NODE_ENV === "development" ? false : "none",
    },
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(cors({
  credentials:true,
  origin:process.env.FRONTEND_URL,
  methods:["GET","POST","PUT","DELETE"]
}))
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

connectPassport();
app.enable("trust proxy");

//importing routes

import UserRoute from "./routes/user.js";
import orderRoute from "./routes/order.js"
import passport from "passport";
import { errorMiddleware } from "./middleware/errorMIddleware.js";
// const userroute = require("./routes/user.js")
app.use("/api/v1", UserRoute);
app.use("/api/v1", orderRoute);

// using error middleware

app.use(errorMiddleware);
