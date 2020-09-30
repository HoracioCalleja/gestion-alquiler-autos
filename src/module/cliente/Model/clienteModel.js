const {  DataTypes, Model } = require("sequelize");
const AlquilerModel = require("../../alquiler/Model/alquilerModel");

module.exports = class ClienteModel extends Model {
  static setUp(sequelizeInstance) {
    ClienteModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        nombre: {
          type: DataTypes.STRING,

          get(){
            return this.getDataValue("nombre").toUpperCase();
          }
        },
        apellido: {
          type: DataTypes.STRING,

          get(){
            return this.getDataValue("apellido").toUpperCase();
          }
        },
        tipoDocumento: {
          type: DataTypes.ENUM,
          values : ["DNI","PASAPORTE"],

        },
        numeroDocumento: {
          type: DataTypes.STRING,
          unique : true
        },
        nacionalidad: {
          type: DataTypes.STRING,

        },
        direccion: {
          type: DataTypes.STRING,

        },
        telefono: {
          type: DataTypes.INTEGER,

        },
        email: {
          type: DataTypes.STRING,

          validate : {
            isEmail : true,
          }
        },
        fechaNacimiento : {
          type : DataTypes.DATE,
        },
        nombreApellidoDocumento : {
          type : DataTypes.VIRTUAL,
          get(){
            const nombre = this.get("nombre");
            const apellido = this.get("apellido");
            const numeroDocumento = this.getDataValue("numeroDocumento");
            return `${nombre} ${apellido} ${numeroDocumento}`
          }
        }
      },
      {
        updatedAt : "actualizado_en",
        createdAt : "creado_en",
        sequelize : sequelizeInstance,
        modelName: "Cliente",
        tableName: "Clientes",
        timestamps: true,
      }
    );

    return ClienteModel;

  }

  // static setUpAssociations(){
  //   ClienteModel.hasOne(AlquilerModel, {foreignKey : "cliente_id"});
  // }

};
