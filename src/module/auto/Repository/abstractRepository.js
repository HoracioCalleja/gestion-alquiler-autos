const { error } = require("console");

module.exports = class AbstractRepository {
  constructor() {
    if (new.target == AbstractRepository) {
      throw new Error("No se puede instanciar la clase AbstractRepository");
    }
  }

  async save(auto) {}

  async delete(auto) {}

  async getAll(auto) {}

  async getById(id) {}


};
