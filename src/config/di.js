const { default: DIContainer, object, get, factory } = require("rsdi");
const { Sequelize } = require("sequelize");
const {
  AutoController,
  AutoService,
  AutoModel,
  AutoRepository,
} = require("../module/auto/module");
const {
  ClienteController,
  ClienteService,
  ClienteModel,
  ClienteRepository,
} = require("../module/cliente/module");
const {
  AlquilerController,
  AlquilerService,
  AlquilerModel,
  AlquilerRepository,
} = require("../module/alquiler/module");

const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

function configureSequelize() {
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
  });
  return sequelize;
}

function configureAutoModel(container) {
  AutoModel.setUp(container.get("Sequelize"));
  return AutoModel;
}

function configureClienteModel(container) {
  ClienteModel.setUp(container.get("Sequelize"));
  return ClienteModel;
}

function configureAlquilerModel(container) {
  AlquilerModel.setUp(container.get("Sequelize"));
  AlquilerModel.setUpAssociations(
    container.get("AutoModel"),
    container.get("ClienteModel")
  );
  return AlquilerModel;
}

function configureAlquilerDefinitions(container) {
  container.addDefinitions({
    AlquilerModel: factory(configureAlquilerModel),
    AlquilerRepository: object(AlquilerRepository).construct(
      get("AlquilerModel"),
      get("AutoModel"),
      get("ClienteModel")
    ),
    AlquilerService: object(AlquilerService).construct(
      get("AlquilerRepository")
    ),
    AlquilerController: object(AlquilerController).construct(
      get("AlquilerService"),
      get("AutoService"),
      get("ClienteService")
    ),
  });
}

function configureClienteDefinitions(container) {
  container.addDefinitions({
    ClienteModel: factory(configureClienteModel),
    ClienteRepository: object(ClienteRepository).construct(get("ClienteModel")),
    ClienteService: object(ClienteService).construct(get("ClienteRepository")),
    ClienteController: object(ClienteController).construct(
      get("ClienteService")
    ),
  });
}

function configureAutoDefinitions(container) {
  container.addDefinitions({
    AutoModel: factory(configureAutoModel),
    AutoRepository: object(AutoRepository).construct(get("AutoModel")),
    AutoService: object(AutoService).construct(get("AutoRepository")),
    AutoController: object(AutoController).construct(get("AutoService")),
  });
}

function configureSession(container) {
  const ONE_WEEK_IN_SECONDS = 604800000;

  const sequelize = container.get("SessionSequelize");
  const sessionOptions = {
    store: new SequelizeStore({ db: sequelize }),
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: ONE_WEEK_IN_SECONDS },
  };
  return session(sessionOptions);
}

function configureCommonDefinitions(container) {
  container.addDefinitions({
    Sequelize: factory(configureSequelize),
    SessionSequelize: factory(configureSessionSequelizeDatabase),
    Session: factory(configureSession),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  configureCommonDefinitions(container);
  configureAutoDefinitions(container);
  configureClienteDefinitions(container);
  configureAlquilerDefinitions(container);
  return container;
};
