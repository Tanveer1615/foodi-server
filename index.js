const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const menuRoutes = require("./api/routes/menuRoutes");

// middleware
app.use(cors());
app.use(express.json());

// mongodb configuration using mongoose

mongoose
  .connect(process.env.URL)
  .then(console.log("MongoDB Connected Successfully!"))
  .catch((error) => console.log("Error connecting to MongoDB", error));

// jwt authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;

  const userdata = await User.findOne(user);

  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token, userdata });
});

//   import routes here
const cartRoutes = require("./api/routes/cartRoutes");
const userRoutes = require("./api/routes/userRoutes");
const User = require("./api/models/User");
app.use("/menu", menuRoutes);
app.use("/carts", cartRoutes);
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello Foodi Client Server!");
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
