const express = require("express");
const connectDB = require("./mongoConnect");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 3000;
const blogapiRouter = require("./routes/blogapiRoutes");
const authRouter = require("./routes/authRoutes");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");

const app = express();

require("./passport");

// Enable body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(compression());
app.use(helmet());

// cors setting
const corsOption = {
  origin: ["https://satoshi-sh.github.io", "https://satoshis-developer.xyz"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOption));

// set static folder

app.use(express.static(path.join(__dirname, "public")));

app.use("/blogapi", blogapiRouter);
app.use("/auth", authRouter);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
