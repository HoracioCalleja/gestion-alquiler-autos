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
            console.log("En el get de aire",tiene);
            return tiene ? "Si" : "No"
          },
          set(value) {
            console.log("En el set de aire: ",value);

            if (value === "1"){
              this.setDataValue("aireAcondicionado",true)
            } else {
              this.setDataValue("aireAcondicionado",false)
            }
          }
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
            console.log("En el get de cambio: ",esCambioAutomatico);
            return esCambioAutomatico ? "Si" : "No"
          },
          set(value) {
            console.log("Set de cambio: ",value);
            if (value === "1"){
              this.setDataValue("esAutomatico",true)
            } else {
              this.setDataValue("esAutomatico",false)
            }
          }
        },
        activo: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        rentado: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue : false,
        },
        precioPorDia : {
          type : DataTypes.INTEGER,
          allowNull : false,
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
