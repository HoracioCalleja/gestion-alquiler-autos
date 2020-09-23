const AbstractRepository = require ('../abstractRepository'); 
const { fromModelToEntity } = require ('../../Maper/autoMapper');
const AutoModel = require ('../../Model/autoModel');


module.exports = class AutoRepository extends AbstractRepository{
  constructor(autoModel){
    super();
    this.autoModel = autoModel;
  }

  async save(auto){
    let autoModel;
    const buildOptions = {isNewRecord : !auto.id};
    autoModel = AutoModel.build(auto, buildOptions);
    autoModel = await autoModel.save();
    console.log("En el repository",autoModel)
    return fromModelToEntity(autoModel);
  }
  
  async delete(auto){
    return Boolean(await AutoModel.destroy({where : { id : auto.id }}));
  }
  
  async getAll(){
    const autos = await AutoModel.findAll();
    return autos.map((auto) => fromModelToEntity(auto));
  }
  
  async getById(id){
    const auto = await AutoModel.findByPk(id);
    return fromModelToEntity(auto)
  }

}

