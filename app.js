const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const userWorkoutRoutes = require("./routes/userWorkoutRoutes")

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Fitness Logger</h1>");
});

app.use("/user", userRoutes);
app.use("/exercises", exerciseRoutes);
app.use("/userWorkout", userWorkoutRoutes)

module.exports = app;
