const AbstractRepository = require ('../abstractRepository'); 
const { fromModelToEntity } = require ('../../Maper/autoMapper');
const AutoModel = require ('../../Model/autoModel');


module.exports = class AutoRepository extends AbstractRepository{
  constructor(autoModel){
    super();
    this.autoModel = autoModel;
  }

  async save(auto){

  }
  
  async delete(auto){

  }
  
  async getAll(){
    const autos = await AutoModel.findAll();
    return autos.map(fromModelToEntity)
  }
  
  async getById(id){
    const auto = await AutoModel.findByPk(id);
    return auto.toJSON();
  }

}

