const boom = require("@hapi/boom");
const { models } = require("../libs/sequelize");

class UsersService {
  constructor() { }

  async find(query) {
    const options = {};
    const { limit, skip } = query;
    if (limit && skip) {
      options.offset = skip;
      options.limit = limit;
    }

    const rta = await models.User.findAll(options);
    return rta;
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound("No se encontró el elemento");
    }
    return user;
  }
  async update(id, changes) {
    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return user.dataValues.id;
  }
}

module.exports = UsersService;
