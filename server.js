import app from "./app.js"
import { connectDB } from "./config/database.js";

connectDB();
app.get("/",(req,res,next)=>{
    res.send("<h1>Server is working</h1>")
})


app.listen(process.env.PORT, () =>
  console.log(
    `Server is working on PORT: ${process.env.PORT}, in ${process.env.NODE_ENV} MODE`
  )
);

//importing routes

// const userroute = require("./routes/user.js")
// app.use("/api/v1", userroute);