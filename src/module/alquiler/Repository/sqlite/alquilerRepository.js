const AbstractRepository = require ('../abstractRepository'); 
const { fromModelToEntity } = require ('../../Maper/alquilerMapper');
const AlquilerModel = require ('../../Model/alquilerModel');


module.exports = class AlquilerRepository extends AbstractRepository{
  constructor(alquilerModel, autoModel, clienteModel){
    super();
    this.alquilerModel = alquilerModel;
    this.clienteModel = clienteModel;
    this.autoModel = autoModel;
  }

  async save(alquiler){
    return;
  }
  
  async delete(alquiler){
    return Boolean(await AlquilerModel.destroy({where : { id : alquiler.id }}));
  }
  
  async getAll(){
    const alquileres = await AlquilerModel.findAll();
    return alquileres.map((alquiler) => fromModelToEntity(alquiler));
  }
  
  async getById(id){
    const alquiler = await AlquilerModel.findByPk(id);
    return fromModelToEntity(alquiler)
  }

}

