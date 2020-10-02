const { precompile } = require("nunjucks");
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
        precioUnitario: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        desde: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        hasta: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        medioDePago: {
          type: DataTypes.ENUM,
          values: ["EFECTIVO", "TARJETA"],
          allowNull: false,
        },
        pagado: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          get(){
            const pagado = this.getDataValue("pagado")
            return pagado ? "Si" : "No"
          },
          set(value) {
            if (value === "1") {
              this.setDataValue("pagado", true);
            } else {
              this.setDataValue("pagado", false);
            }
          },
        },
        precioTotal: {
          type: DataTypes.INTEGER,
          get(){
            return `$${this.getDataValue("precioTotal")}`;
          },
          set(){
            const precioUnitario = this.getDataValue("precioUnitario");
            const milisegundosEnUnDia = 1000 * 3600 * 24;
            const desde = this.getDataValue("desde").getTime();
            const hasta = this.getDataValue("hasta").getTime();
            const diferencia = (hasta - desde) / milisegundosEnUnDia;
            const precioTotal =  diferencia * precioUnitario;
            console.log(precioTotal)
            if (desde === hasta){
              this.setDataValue("precioTotal", precioUnitario);
            } else {
              this.setDataValue("precioTotal", precioTotal);
            }
          }
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
    AutoModel.hasOne(AlquilerModel, { foreignKey: "auto_id" });
    ClienteModel.hasOne(AlquilerModel, { foreignKey: "cliente_id" });
    AlquilerModel.belongsTo(AutoModel, { foreignKey: "auto_id" });
    AlquilerModel.belongsTo(ClienteModel, { foreignKey: "cliente_id" });
  }
};
