const Joi = require("joi");

const id = Joi.number();
const name = Joi.string().min(3);
const lastName = Joi.string().min(3);
const email = Joi.string().email();
const phoneNumber = Joi.string().max(20).pattern(/^[0-9]+$/)
const cc = Joi.number();
const skip = Joi.number();
const limit = Joi.number();

const createUserSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  email: email.required(),
  phoneNumber: phoneNumber.required(),
  cc: cc.required()
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const queryUserSchema = Joi.object({
  skip,
  limit,
});

const updateUserSchema = Joi.object({
  name: name,
  lastName: lastName,
  email: email,
  phoneNumber: phoneNumber,
  cc: cc
});

const deleteUserSchema = Joi.object({
  id: id.required(),
});

module.exports = {
  createUserSchema,
  getUserSchema,
  queryUserSchema,
  updateUserSchema,
  deleteUserSchema,
};
