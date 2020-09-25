const Auto = require("../Entity/Auto");

function fromModelToEntity(car) {
  return new Auto(car.toJSON());
}

function fromDataToEntity({
  id,
  marca,
  modelo,
  anio,
  kms,
  color,
  pasajeros,
  esAutomatico,
  aireAcondicionado,
  activo,
  rentado,
  "precio-dia" : precioPorDia,
}) {
  return new Auto({
    id: Number(id),
    marca,
    modelo,
    anio,
    kms,
    color,
    pasajeros,
    esAutomatico,
    aireAcondicionado,
    activo,
    rentado,
    precioPorDia,
  });
}

module.exports = {
  fromModelToEntity,
  fromDataToEntity,
};
