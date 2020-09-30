const Alquiler = require("../Entity/Alquiler");
const Auto = require("../../auto/Entity/Auto");
const Cliente = require("../../cliente/Entity/Cliente");

function fromModelToEntity(alquilerModel) {
  let modelJSON = alquilerModel.toJSON();
  modelJSON.desde = modelJSON.desde.toISOString().split('T')[0];
  modelJSON.hasta = modelJSON.hasta.toISOString().split('T')[0];
  return new Alquiler(modelJSON);
}

function fromDataToEntity({
  id,
  auto_id,
  cliente_id,
  "precio-unitario": precioUnitario,
  desde,
  hasta,
  "medio-pago": medioDePago,
  pagado,
}) {
  return new Alquiler({
    id: Number(id),
    Auto : new Auto ({id : Number(auto_id)}),
    Cliente : new Cliente ({id : Number(cliente_id)}),
    precioUnitario,
    desde,
    hasta,
    medioDePago,
    pagado,
  });
}


module.exports = {
  fromModelToEntity,
  fromDataToEntity,
};
