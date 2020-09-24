const {  DataTypes, Model } = require("sequelize");

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
          allowNull: false,
        },
        apellido: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        tipoDocumento: {
          type: DataTypes.ENUM,
          values : ["DNI","PASAPORTE"],
          allowNull: false,
        },
        numeroDocumento: {
          type: DataTypes.STRING,
          allowNull: false,
          unique : true
        },
        nacionalidad: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        direccion: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        telefono: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          validate : {
            isEmail : true,
          }
        },
        fechaNacimiento : {
          type : DataTypes.STRING,
          allowNull : false,
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
};
