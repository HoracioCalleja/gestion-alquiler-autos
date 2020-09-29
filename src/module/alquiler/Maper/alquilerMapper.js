const Alquiler = require("../Entity/Alquiler");

function fromModelToEntity(alquilerModel) {
  return new Alquiler(alquilerModel.toJSON());
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
    auto_id : Number(auto_id),
    cliente_id : Number(cliente_id),
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
