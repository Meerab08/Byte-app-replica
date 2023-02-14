// ***************************************************
//        It will created a new Express Server
// ***************************************************
const mongoose = require("mongoose");
const DB =
  "mongodb+srv://meerab:meerab12345@cluster0.dqzdvrm.mongodb.net/?retryWrites=true&w=majority";
console.log("URL: ", DB);

exports.connectToDb = () => {
  try {
    mongoose.connect(
      DB,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true,
        // useFindAndModify: false,
      },
      console.log("Db connected")
    );
  } catch {
    console.log("db not connected");
  }
};
//  ..................   OR    ..................
// const con = mongoose.connection;

// con.on("open", function () {
//   console.log("connection established!");
// });
