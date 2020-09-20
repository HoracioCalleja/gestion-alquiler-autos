require('dotenv').config();
const express = require ('express');
const configureDI = require('../config/di');

const app = express();
const container = configureDI(app);

const mainDB = container.get("Sequelize");

container.get("AutoModel");

(async () => {
  await mainDB.sync({force : true});
  
  //   const porsche = await autoModel.create({
  //   marca: "Porsche",
  //   modelo: "UltraFast",
  //   anio: 2020,
  //   kms: 0,
  //   color: "Negro",
  //   aireAcondicionado: true,
  //   pasajeros: 3,
  //   esAutomatico: true,
  // });

}) ()
