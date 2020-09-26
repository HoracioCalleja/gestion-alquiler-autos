const AlquilerController = require('./Controller/alquilerController');
const AlquilerService = require('./Service/alquilerService');
const AlquilerRepository = require('./Repository/sqlite/alquilerRepository');
const AlquilerModel = require('./Model/alquilerModel');

function init(app , container){

  const controller = container.get("AlquilerController");

  controller.configureRoutes(app);
}

module.exports = {
  init,
  AlquilerController,
  AlquilerService,
  AlquilerRepository,
  AlquilerModel,
}
