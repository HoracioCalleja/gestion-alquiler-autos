const ClienteController = require('./Controller/clienteController');
const ClienteService = require('./Service/clienteService');
const ClienteRepository = require('./Repository/sqlite/clienteRepository');
const ClienteModel = require('./Model/clienteModel');

function init(app , container){

  const controller = container.get("ClienteController");
  
  controller.configureRoutes(app);
}

module.exports = {
  init,
  ClienteController,
  ClienteService,
  ClienteRepository,
  ClienteModel,
}
