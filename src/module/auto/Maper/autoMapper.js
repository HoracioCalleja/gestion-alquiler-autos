const Auto = require('../Entity/Auto');

function fromModelToEntity({
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
  precioPorDia,
}) {
  return new Auto(
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
    precioPorDia
  );
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
  'precio-dia': precioPorDia,
}) {
  return new Auto(
    id = Number(id),
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
  );
}

module.exports = {
  fromModelToEntity,
  fromDataToEntity,
};
