const Cliente = require ('../Entity/Cliente');

function fromModelToEntity(cliente){
  return new Cliente(cliente.toJSON());  
}

function fromDataToEntity({
  id,
  nombre,
  apellido,
  "tipo-documento" : tipoDocumento,
  "numero-documento" : numeroDocumento,
  nacionalidad,
  direccion,
  telefono,
  email,
  "fecha-nacimiento" : fechaNacimiento
}){
  return new Cliente({
    id : Number(id),
    nombre,
    apellido,
    tipoDocumento,
    numeroDocumento,
    nacionalidad,
    direccion,
    telefono,
    email,
    fechaNacimiento
  })
}

module.exports = {
  fromModelToEntity,
  fromDataToEntity,
}


