const Auto = require('../Entity/Auto');
const CarNotDefinedError = require('../errors/carNotDefinedError');
const CarIdNotDefinedError = require('../errors/carIdNotDefinedError');

module.exports = class AutoService {
  constructor(autoRepository) {
    this.autoRepository = autoRepository;
  }

  async save(auto) {
    if (!(auto instanceof Auto)) {
      throw new CarNotDefinedError('Invalid Car or not defined');
    }
    return this.autoRepository.save(auto);
  }

  async delete(auto) {
    if (!(auto instanceof Auto)) {
      throw new CarNotDefinedError('Invalid Car or not defined');
    }
    return this.autoRepository.delete(auto);
  }

  async getAll() {
    return await this.autoRepository.getAll();
  }

  async getById(id) {
    if (id === undefined) {
      throw new CarIdNotDefinedError('Car ID not defined');
    }
    return await this.autoRepository.getById(id);
  }

  async changeToRented(autoId) {
    const auto = await this.getById(autoId);
    auto.rentado = 'SI';
    await this.save(auto);
    return auto;
  }

  async getAvailableCars() {
    return await this.autoRepository.getAvailableCars();
  }

  async getPrecioUnitario(id) {
    if (id === undefined) {
      throw new CarIdNotDefinedError();
    }
    return await this.autoRepository.getPrecioUnitario(id);
  }
};
