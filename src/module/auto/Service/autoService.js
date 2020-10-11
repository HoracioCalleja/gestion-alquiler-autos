const Auto = require('../Entity/Auto');

module.exports = class AutoService {
  constructor(autoRepository) {
    this.autoRepository = autoRepository;
  }

  async save(auto) {
    if (auto === undefined) {
      throw new Error('Auto not defined');
    }
    return this.autoRepository.save(auto);
  }

  async delete(auto) {
    if (!(auto instanceof Auto)) {
      throw new Error('No se puede guarda un objeto que no sea de tipo Auto');
    }
    return this.autoRepository.delete(auto);
  }

  async getAll() {
    return await this.autoRepository.getAll();
  }

  async getById(id) {
    if (id === undefined) {
      throw new Error('Se necesita de un ID para obtener un Auto');
    }
    return await this.autoRepository.getById(id);
  }

  async changeToRented(autoId) {
    const auto = await this.getById(autoId);
    auto.rentado = 'SI';
    await this.save(auto);
    return auto;
  }

  async getAvailableCars(){
    return await this.autoRepository.getAvailableCars();
  }

  async getPrecioUnitario(id) {
    if (id === undefined) {
      throw new Error('Se necesita de un ID para obtener informaicion del Auto');
    }
    return await this.autoRepository.getPrecioUnitario(id);
  }
};
