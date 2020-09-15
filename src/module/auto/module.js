const AutoController = require('./Controller/autoController');
const AutoService = require('./Service/autoService');
const AutoRepository = require('./Repository/sqlite/autoRepository');
const AutoModel = require('./Model/autoModel');

function init(app , container){

  const controller = container.get("AutoController");

  controller.configureRoutes(app);
}

module.exports = {
  init,
  AutoController,
  AutoService,
  AutoRepository,
  AutoModel,
}
