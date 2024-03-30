const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");

app.use(express.json());

const connectDB = require("./src/Database/dbconnect");
const PORT = process.env.PORT || 3001;
const user = require("./src/Routes/UserRoute");
const blogroute = require("./src/Routes/BlogRoute");
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use("/api/auth", user);
app.use("/api/blogs", blogroute);

app.get("/", (req, res) => {
  res.send(`<h1>Hello World</h1>`);
});

const listen = async () => {
  try {
    connectDB();
    app.listen(PORT, () => {
      console.log(`the server is running at ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

listen();
