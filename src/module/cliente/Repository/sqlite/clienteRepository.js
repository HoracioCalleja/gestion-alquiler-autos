const AbstractRepository = require('../abstractRepository');
const { fromModelToEntity } = require('../../Maper/clienteMapper');
const AlquilerModel = require('../../../alquiler/Model/alquilerModel');
const ClienteModel = require('../../Model/clienteModel');

module.exports = class ClienteRepository extends AbstractRepository {
  constructor(clienteModel) {
    super();
    this.clienteModel = clienteModel;
  }

  async save(cliente) {
    let clienteModel;
    const buildOptions = { isNewRecord: !cliente.id };
    clienteModel = ClienteModel.build(cliente, buildOptions);
    clienteModel = await clienteModel.save();
    return fromModelToEntity(clienteModel);
  }

  async delete(cliente) {
    return Boolean(await this.clienteModel.destroy({ where: { id: cliente.id } }));
  }

  async getAll() {
    const clientes = await this.clienteModel.findAll();
    return clientes.map((cliente) => fromModelToEntity(cliente));
  }

  async getById(id) {
    const cliente = await this.clienteModel.findByPk(id);
    return fromModelToEntity(cliente);
  }

  async getClientsIndebted() {
    let clients = await this.clienteModel.findAll({
      include: [{ model: AlquilerModel, where: { pagado: false } }],
    });
    return clients;
  }

  async getClientRentals(id) {
    const clientRentals = await ClienteModel.findAll({
      where: {
        id,
      },
      include: {
        model: AlquilerModel,
      },
    });
    return clientRentals;
  }
};
