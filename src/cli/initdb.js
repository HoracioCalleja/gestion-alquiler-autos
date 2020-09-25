require('dotenv').config();
const express = require ('express');
const configureDI = require('../config/di');

const app = express();
const container = configureDI(app);


(async () => {
  
  const mainDB = container.get("Sequelize");
  
  const autoModel = container.get("AutoModel");
  const clienteModel = container.get("ClienteModel");

  // mainDB.sync({force : true});
  mainDB.sync();
  
  const sessionDB = container.get("SessionSequelize");
  const session = container.get("Session");
  
  sessionDB.sync()
})()




