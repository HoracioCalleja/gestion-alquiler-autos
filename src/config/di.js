const { default : DIContainer , object , get,  factory } = require ('rsdi');
const { Sequelize } = require('sequelize');
const { AutoController , AutoService , AutoModel , AutoRepository } = require ('../module/auto/module');
const session = require('express-session');
const SequelizeStore = require ('connect-session-sequelize')(session.Store);

function configureSequelize(){
    const sequelize = new Sequelize({
      dialect: "sqlite",
      storage: process.env.DB_PATH,
      logging: console.log,
    });
  return sequelize;
}

function configureSessionSequelizeDatabase() {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: process.env.DB_SESSION_PATH,
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

function configureSession(container) {
  const ONE_WEEK_IN_SECONDS = 604800000;

  const sequelize = container.get('SessionSequelize');
  const sessionOptions = {
    store: new SequelizeStore({ db: sequelize }),
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: ONE_WEEK_IN_SECONDS },
  };
  return session(sessionOptions);
}

function configureCommonDefinitions(container){
  container.addDefinitions({
    Sequelize : factory(configureSequelize),
    SessionSequelize : factory(configureSessionSequelizeDatabase),
    Session : factory(configureSession),
  })
}

module.exports = function configureDI () {
  const container = new DIContainer();
  configureCommonDefinitions(container);  
  configureAutoDefinitions(container);  
  return container;
}



