const AbstractRepository = require('../abstractRepository');
const { fromModelToEntity } = require('../../Maper/alquilerMapper');

module.exports = class AlquilerRepository extends AbstractRepository {
  constructor(alquilerModel, autoModel, clienteModel) {
    super();
    this.alquilerModel = alquilerModel;
    this.clienteModel = clienteModel;
    this.autoModel = autoModel;
  }

  async save(alquiler) {
    let alquilerModel;

    const buildOptions = {
      isNewRecord: !alquiler.id,
    };

    alquilerModel = this.alquilerModel.build(alquiler, buildOptions);
    alquilerModel.setDataValue('auto_id', alquiler.Auto.id);
    alquilerModel.setDataValue('cliente_id', alquiler.Cliente.id);
    alquilerModel = await alquilerModel.save(alquilerModel);
    return fromModelToEntity(alquilerModel);
  }

  async delete(alquiler) {
    return Boolean(await this.alquilerModel.destroy({ where: { id: alquiler.id } }));
  }

  async getAll() {
    const alquileres = await this.alquilerModel.findAll({
      include: [this.autoModel, this.clienteModel],
    });
    return alquileres.map((alquiler) => fromModelToEntity(alquiler));
  }

  async getById(id) {
    const alquiler = await this.alquilerModel.findByPk(id, {
      include: [this.autoModel, this.clienteModel],
    });
    return fromModelToEntity(alquiler);
  }

  getMedioDePagoValues() {
    const values = this.alquilerModel.rawAttributes.medioDePago.values;
    return values;
  }

  async getAlquileresInDebt() {
    const alquileres = await this.alquilerModel.findAll({
      include: [this.autoModel, this.clienteModel],
      where : {
        pagado : false
      },
    });
    return alquileres.map(alquiler => fromModelToEntity(alquiler));
  }
};
