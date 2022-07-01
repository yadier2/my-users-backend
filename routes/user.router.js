const express = require("express");
const validatorHandler = require("../middlewares/validator.handler");
const {
  createUserSchema,
  getUserSchema,
  queryUserSchema,
  updateUserSchema,
  deleteUserSchema,
} = require("../schemas/user.schemas");
const UsersService = require("../services/user.service");
const router = express.Router();

const service = new UsersService();

router.get("/",
  validatorHandler(queryUserSchema, "query"),
  async (req, res, next) => {
    try {
      const users = await service.find(req.query);
      res.send(users);
    } catch (error) {
      next(error);
    }
  });

router.get(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await service.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createUserSchema, "body"),
  async (req, res, next) => {
    const body = req.body;
    try {
      const newUser = await service.create(body);
      res.status(201).json({
        message: "Created user",
        newUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  validatorHandler(getUserSchema, "params"),
  validatorHandler(updateUserSchema, "body"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const user = await service.update(id, body);

      res.json({
        message: "Updated user",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(deleteUserSchema, "params"),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const rta = await service.delete(id);
      res.json({
        message: "Deleted user",
        id: rta,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
