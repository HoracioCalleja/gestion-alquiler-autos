require('dotenv').config();
const express = require ('express');
const configureDI = require('../config/di');

const app = express();
const container = configureDI(app);

const mainDB = container.get("Sequelize");


const autoModel = container.get("AutoModel");

mainDB.sync();

// const sessionDB = container.get("SessionSequelize");

// sessionDB.sync({force: true})



