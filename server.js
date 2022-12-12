// *****************************************************
//        It will created a new Express Server
// *****************************************************
// Creating the server
const express = require("express");
const app = express();

// We need to tell our app which port to run on
const PORT = process.env.PORT || 3001;
// *****************************************************
// *****************************************************
// Finall, tell Express to start a socket and listen for
// connections on the path
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
