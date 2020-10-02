const Cliente = require ('../Entity/Cliente');

module.exports = class ClienteService {
  constructor(clienteRepository){
    this.clienteRepository = clienteRepository;
  }

  async save(cliente){
    if(cliente === undefined){
      throw new Error ("Cliente not defined")
    }
    return this.clienteRepository.save(cliente);
  }
  
  async delete(cliente){
    if(!(cliente instanceof Cliente)){
      throw new Error("No se puede guarda un objeto que no sea de tipo Cliente")
    }
    return this.clienteRepository.delete(cliente);
  }
  
  async getAll(){
    return await this.clienteRepository.getAll();
  }
  
  async getById(id){
    if(id === undefined){
      throw new Error('Se necesita de un ID para obtener un Cliente');
    }
    return await this.clienteRepository.getById(id);
  }

  async getClientsIndebted(){
    return await this.clienteRepository.getClientsIndebted();
  }

  async getClientRentals(id){
    return await this.clienteRepository.getClientRentals(id);
  }


}



