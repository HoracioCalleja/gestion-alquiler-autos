const { default : DIContainer , object , factory } = require ('rsdi');
const AutoController = require ('../src/module/auto/Controller/autoController');

module.exports = function configureDI () {
  const container = new DIContainer();
  container.addDefinitions({
    "AutoController" : object(AutoController),
  })  
  return container;
}



