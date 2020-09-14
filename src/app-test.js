const express = require("express");
const { Sequelize, DataTypes, Model } = require("sequelize");

const PORT = process.env.PORT | 8080;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: console.log,
});

const app = express();

class Auto extends Model {}

( async () => {


Auto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    anio: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    kms: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aireAcondicionado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    pasajeros: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //Caja de cambio automática
    cambioAutomatico: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    updatedAt : "actualizado_en",
    createdAt : "creado_en",
    sequelize,
    modelName: "Auto",
    timestamps: true,
  }
);

await sequelize.sync();

const autoNuevo = await Auto.create({
  marca : "Ford",
  modelo : "Falcon Energy",
  anio : 2018,
  kms : "40.000",
  color : "Verde",
  aireAcondicionado : true,
  pasajeros : 3,
  cambioAutomatico : false,
});

// const todos = await Auto.findAll();

const marcasYmodelos = await Auto.findAll({
  attributes : ["marca","modelo"]
})


console.log(JSON.stringify(marcasYmodelos,null,2))

})()




// app.get('/', (req,res) => {
//   res.status(200).send("Hola express");
// })

app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`))
