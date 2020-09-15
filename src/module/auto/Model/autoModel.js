const {  DataTypes, Model } = require("sequelize");

module.exports = class AutoModel extends Model {
  static setUp(sequelizeInstance) {
    AutoModel.init(
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
        sequelize : sequelizeInstance,
        modelName: "Auto",
        timestamps: true,
      }
    );

    return AutoModel;

  }
};
