const AbstractRepository = require('../abstractRepository');
const { fromModelToEntity } = require('../../Maper/autoMapper');
const { Op } = require('sequelize');

module.exports = class AutoRepository extends AbstractRepository {
  constructor(autoModel) {
    super();
    this.autoModel = autoModel;
  }

  async save(auto) {
    let autoModel;
    const buildOptions = { isNewRecord: !auto.id };
    autoModel = this.autoModel.build(auto, buildOptions);
    autoModel = await autoModel.save();
    return fromModelToEntity(autoModel);
  }

  async delete(auto) {
    return Boolean(await this.autoModel.destroy({ where: { id: auto.id } }));
  }

  async getAll() {
    const autos = await this.autoModel.findAll();
    return autos.map((auto) => fromModelToEntity(auto));
  }

  async getById(id) {
    const auto = await this.autoModel.findByPk(id);
    return fromModelToEntity(auto);
  }

  async getPrecioUnitario(id) {
    const auto = await this.autoModel.findByPk(id, {
      attributes: ['precioPorDia'],
    });
    const precioUnitario = auto.dataValues.precioPorDia;
    return precioUnitario;
  }

  async getAvailableCars() {
    const availableCars = await this.autoModel.findAll({
      where: {
        [Op.and]: [{ activo: true }, { rentado: false }],
      },
    });
    return availableCars;
  }

};
