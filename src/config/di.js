const { default : DIContainer , object , get,  factory } = require ('rsdi');
const { Sequelize } = require('sequelize');
const { AutoController , AutoService , AutoModel , AutoRepository } = require ('../module/auto/module');


function configureSequelize(){
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: console.log,
    });
  return sequelize;
}

function configureAutoModel(container){
  AutoModel.setUp(container.get("Sequelize"));
  return AutoModel;
}

function configureAutoDefinitions(container){
  container.addDefinitions({
    AutoModel : factory(configureAutoModel),
    AutoRepository : object(AutoRepository).construct(get("AutoModel")),
    AutoService : object(AutoService).construct(get("AutoRepository")),
    AutoController : object(AutoController).construct(get("AutoService")),
  })
}

function configureCommonDefinitions(container){
  container.addDefinitions({
    Sequelize : factory(configureSequelize),
  })
}

module.exports = function configureDI () {
  const container = new DIContainer();
  configureCommonDefinitions(container);  
  configureAutoDefinitions(container);  
  return container;
}



