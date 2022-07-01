const express = require("express");

const usersRouter = require("./user.router");

function routerApi(app) {
  const router = express.Router();
  app.use("/api/", router);
  router.use(
    "/users",
    usersRouter
  );
}

module.exports = routerApi;
