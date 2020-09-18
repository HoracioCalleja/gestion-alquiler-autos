const Auto = require ('../Entity/Auto');

function fromModelToEntity(car){
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
  aireAcondicionado
}){
  return new Auto({
    id : Number(id),
    marca,
    modelo,
    anio,
    kms,
    color,
    pasajeros,
    esAutomatico : eval(esAutomatico),
    aireAcondicionado : eval(aireAcondicionado),
  })
}

module.exports = {
  fromModelToEntity,
  fromDataToEntity,
}


