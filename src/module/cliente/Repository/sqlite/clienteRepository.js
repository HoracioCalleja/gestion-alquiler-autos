const AbstractRepository = require ('../abstractRepository'); 
const { fromModelToEntity } = require ('../../Maper/clienteMapper');
const ClienteModel = require ('../../Model/clienteModel');



module.exports = class ClienteRepository extends AbstractRepository{
  constructor(clienteModel){
    super();
    this.clienteModel = clienteModel;
  }

  async save(cliente){
    let clienteModel;
    const buildOptions = {isNewRecord : !cliente.id};
    clienteModel = ClienteModel.build(cliente, buildOptions);
    clienteModel = await clienteModel.save();
    return fromModelToEntity(clienteModel);
  }
  
  async delete(cliente){
    return Boolean(await ClienteModel.destroy({where : { id : cliente.id }}));
  }
  
  async getAll(){
    const clientes = await ClienteModel.findAll();
    return clientes.map((cliente) => fromModelToEntity(cliente));
  }
  
  async getById(id){
    const cliente = await ClienteModel.findByPk(id);
    return fromModelToEntity(cliente)
  }

}

