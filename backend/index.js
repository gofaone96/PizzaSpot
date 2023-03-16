const express = require("express");
var cors = require("cors");
require("dotenv").config();
const app = express();



//impot classes



var corsOptions = {
  origin: "*",
  
};

app.use(express.json());
app.use(cors(corsOptions));

app.listen(8080, () => {
  console.log("Server running on port 8080");
});


app.use("/register", register);
app.use("/login", login);

