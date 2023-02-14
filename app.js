const express = require("express");
const { connectToDb } = require("./config/server");

const resturantRouter = require("./routes/restaurant");
const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");

const app = express();

// We need to tell our app which port to run on
// process.env['PORT']
const PORT = process.env.PORT || 3001;
// *****************************************************

// tell app to use json format
app.use(express.json());

// enroute to the file restaurant.js
app.use("/restuarant", resturantRouter);
app.use("/user", userRouter);
app.use("/category", categoryRouter);
// *****************************************************
// Finall, tell Express to start a socket and listen for
// connections on the path

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
connectToDb();
