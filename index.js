const express = require("express");
const cors = require("cors");
const routerApi = require("./routes/index");
const path = require("path");
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require("./middlewares/error.handler");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
const whitelist = ["http://localhost:8080", "http://localhost:3000"];

const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No permitido"));
    }
  },
};

app.use(cors(options));
app.use(express.static(path.join(__dirname, "build")));
routerApi(app);

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/health", (req, res) => {
  res.send("Server run");
});

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log("Server run port " + port);
});
