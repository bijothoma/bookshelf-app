require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const mybooksRoutes = require("./routes/mybooks");
const friendRoutes = require("./routes/friends");

//connection

connection();

// Set cache control middleware to prevent caching for all routes
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store"); // Prevent caching
  next();
});

//middleware
app.use(express.json());
app.use(cors({ origin: "*" })); //for allowing request from any origin

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/mybooks", mybooksRoutes);
app.use("/api/friends", friendRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`listening on port : ${port}`));
