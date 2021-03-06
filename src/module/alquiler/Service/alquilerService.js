const Alquiler = require('../Entity/Alquiler');

module.exports = class alquilerService {
  constructor(alquilerRepository) {
    this.alquilerRepository = alquilerRepository;
  }

  async save(alquiler) {
    if (alquiler === undefined) {
      throw new Error('alquiler not defined');
    }
    return this.alquilerRepository.save(alquiler);
  }

  async delete(alquiler) {
    if (!(alquiler instanceof Alquiler)) {
      throw new Error('No se puede guarda un objeto que no sea de tipo alquiler');
    }
    return this.alquilerRepository.delete(alquiler);
  }

  async getAll() {
    return await this.alquilerRepository.getAll();
  }

  async getById(id) {
    if (id === undefined) {
      throw new Error('Se necesita de un ID para obtener un alquiler');
    }
    return await this.alquilerRepository.getById(id);
  }

  getMedioDePagoValues() {
    return this.alquilerRepository.getMedioDePagoValues();
  }

  async getDebts() {
    const alquileres = await this.alquilerRepository.getDebts();
    return alquileres;
  }

  async getClientRents(id) {
    if (id === undefined) {
      throw new Error('Se necesita un ID para obtener un alquiler');
    }
    return await this.alquilerRepository.getClientRents(id);
  }
};
