require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

const usersRouter = require("./routes/usersRouter");

const PORT = process.env.port || 4000;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// Catch error
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

// MIDDLEWARES
app.use(express.json());

// ROUTES
app.use("/users", usersRouter);

app.listen(process.env.port || 4000, () =>
  console.log(`Listening on port ${PORT}`)
);
