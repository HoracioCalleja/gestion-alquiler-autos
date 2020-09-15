const Auto = require ('../Model/autoModel');

module.exports = class AutoService {
  constructor(autoRepository){
    this.autoRepository = autoRepository;
  }

  async save(auto){
    if(auto === undefined){
      throw new Error ("Auto not defined")
    }

  }
  
  async delete(auto){
    if(!(auto instanceof Auto)){
      throw new Error("No se puede guarda un objeto que no se Auto")
    }

  }
  
  async getAll(){
    return await this.autoRepository.getAll();
  }
  
  async getById(id){
    if(id === undefined){
      throw new Error('Se necesita de un ID para obtener un Auto');
    }
    return await this.autoRepository.getById(id);
  }



}



