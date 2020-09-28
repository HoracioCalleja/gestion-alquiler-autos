const { DataTypes, Model } = require("sequelize");

module.exports = class AlquilerModel extends Model {
  static setUp(sequelizeInstance) {
    AlquilerModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          // allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          unique: true,
        },
        // auto_id: {
        //   type: DataTypes.INTEGER,
        // //   allowNull: false,
        //   references: {
        //     model: {
        //       tableName: "Autos",
        //     },
        //     key: "id",
        //   },
        // },
        // cliente_id: {
        //   type: DataTypes.INTEGER,
        // //   allowNull: false,
        //   references: {
        //     model: {
        //       tableName: "Clientes",
        //     },
        //     key: "id",
        //   },
        // },
        precioUnitario: {
          type: DataTypes.INTEGER,
          // allowNull: false,
        },
        desde: {
          type: DataTypes.DATE,
          // allowNull: false,
        },
        hasta: {
          type: DataTypes.DATE,
          // allowNull: false,
        },
        medioDePago: {
          type: DataTypes.ENUM,
          values: ["EFECTIVO", "TARJETA"],
          // allowNull: false,
        },
        pagado: {
          type: DataTypes.BOOLEAN,
          // allowNull: false,
          set(value) {
            if (value === "SI") {
              this.setDataValue("pagado", true);
            } else {
              this.setDataValue("pagado", false);
            }
          },
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

  static setUpAssociations(AutoModel, ClienteModel) {
    AutoModel.hasOne(AlquilerModel, {foreignKey : "auto_id"});
    ClienteModel.hasOne(AlquilerModel, {foreignKey : "cliente_id"});
    AlquilerModel.belongsTo(AutoModel , {foreignKey : "auto_id"});
    AlquilerModel.belongsTo(ClienteModel , {foreignKey : "cliente_id"});
  }
};
