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
      type: DataTypes.INTEGER,
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
    updatedAt: "actualizado_en",
    createdAt: "creado_en",
    sequelize,
    modelName: "Auto",
    timestamps: true,
  }
);

(async () => {
  await sequelize.sync();

  //el metodo create, hace dos pasos en uno (build y save).
  const ford = await Auto.create({
    marca: "Ford",
    modelo: "Falcon Energy",
    anio: 2018,
    kms: 40000,
    color: "Verde",
    aireAcondicionado: true,
    pasajeros: 3,
    cambioAutomatico: false,
  });

  const porsche = await Auto.create({
    marca: "Porsche",
    modelo: "UltraFast",
    anio: 2020,
    kms: 0,
    color: "Negro",
    aireAcondicionado: true,
    pasajeros: 3,
    cambioAutomatico: true,
  });

  //build -> construye una instancia de manera no asincrona, para guardarla
  //         se aplica el metodo .save() sobre la instancia await renault.save()
  const renault = Auto.build({
    marca: "Volkswagen",
    modelo: "Skurt",
    anio: 2013,
    kms: 140000,
    color: "Negro",
    aireAcondicionado: true,
    pasajeros: 4,
    cambioAutomatico: false,
  });

  //update solo de un atributo
  renault.marca = "Ferrari";
  
  //se guarda la instancia, sino no se actuliza la base de datos
  const savedRenault = await renault.save();
  
  //para mostrar por consola se usa el metodo toJSON() en la instancia
  console.log(savedRenault.toJSON());

  //elimina el la instancia renault en la row de la base de datos
  renault.destroy();

  const todos = await Auto.findAll();

  //con atrributes podemos seleccionar las columnas que nos interesan traer
  const marcasYmodelos = await Auto.findAll({
    attributes: ["marca", "modelo"],
  });

  console.log(`Hay ${todos.length} autos registrados`)
  console.log(todos.map( auto => auto.toJSON()));

  console.log(`Marcas y modelos`)
  console.log(marcasYmodelos.map( mym => mym.toJSON()));


})();

// app.get('/', (req,res) => {
//   res.status(200).send("Hola express");
// })

app.listen(PORT, () => console.log(`Escuchando en el puerto ${PORT}`));
