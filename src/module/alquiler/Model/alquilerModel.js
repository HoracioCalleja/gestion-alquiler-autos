const { DataTypes, Model } = require("sequelize");

module.exports = class AlquilerModel extends Model {
  static setUp(sequelizeInstance) {
    AlquilerModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
      },
      {
        updatedAt: "actualizado_en",
        createdAt: "creado_en",
        sequelize: sequelizeInstance,
        modelName: "Alquiler",
        tableName: "Alquileres",
        timestamps: true,
      }
    );

    return AlquilerModel;
  }


};
