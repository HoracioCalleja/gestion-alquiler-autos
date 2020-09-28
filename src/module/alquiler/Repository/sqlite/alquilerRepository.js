const AbstractRepository = require("../abstractRepository");
const { fromModelToEntity } = require("../../Maper/alquilerMapper");
const AlquilerModel = require("../../Model/alquilerModel");
const AutoModel = require("../../../auto/Model/autoModel");
const ClienteModel = require("../../../cliente/Model/clienteModel");

module.exports = class AlquilerRepository extends AbstractRepository {
  constructor(alquilerModel, autoModel, clienteModel) {
    super();
    this.alquilerModel = alquilerModel;
    this.clienteModel = clienteModel;
    this.autoModel = autoModel;
  }

  async save(alquiler) {
    console.log("Alquiler dentro del SAVE DE REPO : ", alquiler);

    let alquilerModel;

    const buildOptions = {
      isNewRecord: !alquiler.id,
    };

    alquilerModel = this.alquilerModel.build(alquiler, buildOptions);

    console.log("Alquiler despues del build: ", alquilerModel.toJSON());

    alquilerModel.setDataValue("auto_id", alquiler.auto_id);
    alquilerModel.setDataValue("cliente_id", alquiler.cliente_id);

    console.log(
      "Alquiler despues del setDataValue build: ",
      alquilerModel.toJSON()
    );

    alquilerModel = await alquilerModel.save(alquilerModel);

    // return alquiler;

    return fromModelToEntity(alquilerModel);
  }

  async delete(alquiler) {
    return Boolean(await this.alquilerModel.destroy({ where: { id: alquiler.id } }));
  }

  async getAll() {
    const alquileres = await this.alquilerModel.findAll();
    return alquileres.map((alquiler) => fromModelToEntity(alquiler));
  }

  async getById(id) {
    const alquiler = await this.alquilerModel.findByPk(id);
    return fromModelToEntity(alquiler);
  }

  async getAlquilerWithAssociations(id){
    const alquiler = await this.alquilerModel.findByPk(id, {
      include: [this.autoModel, this.clienteModel],
    });
    return alquiler;
  }

};
