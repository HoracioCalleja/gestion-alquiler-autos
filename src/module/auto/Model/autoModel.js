const { DataTypes, Model } = require("sequelize");

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
          get() {
            const tiene = this.getDataValue("aireAcondicionado");
            return tiene ? "Si" : "No";
          },
          set(value) {
            if (value === "1") {
              this.setDataValue("aireAcondicionado", true);
            } else {
              this.setDataValue("aireAcondicionado", false);
            }
          },
        },
        pasajeros: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        //Caja de cambio automática
        esAutomatico: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          get() {
            const esCambioAutomatico = this.getDataValue("esAutomatico");
            return esCambioAutomatico ? "Si" : "No";
          },
          set(value) {
            if (value === "1") {
              this.setDataValue("esAutomatico", true);
            } else {
              this.setDataValue("esAutomatico", false);
            }
          },
        },
        activo: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
          get() {
            const estaActivo = this.getDataValue("activo");
            return estaActivo ? "Si" : "No";
          },
          set(value) {
            if (value === "1") {
              this.setDataValue("activo", true);
            } else {
              this.setDataValue("activo", false);
            }
          },
        },
        rentado: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
          get() {
            const estaRentado = this.getDataValue("rentado");
            return estaRentado ? "Si" : "No";
          },
          set(value) {
            if (value === "1") {
              this.setDataValue("rentado", true);
            } else {
              this.setDataValue("rentado", false);
            }
          },
        },
        precioPorDia: {
          type : DataTypes.INTEGER,
          allowNull: false,
          get(){
            return `$${this.getDataValue("precioPorDia")}`
          }
        },
      },
      {
        updatedAt: "actualizado_en",
        createdAt: "creado_en",
        sequelize: sequelizeInstance,
        modelName: "Auto",
        tableName: "Autos",
        timestamps: true,
      }
    );

    return AutoModel;
  }



};
