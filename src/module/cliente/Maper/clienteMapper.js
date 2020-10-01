const Cliente = require ('../Entity/Cliente');

function fromModelToEntity(cliente){
  let clienteJSON = cliente.toJSON();
  clienteJSON.fechaNacimiento =  clienteJSON.fechaNacimiento.toISOString().split('T')[0];
  return new Cliente(clienteJSON);  
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


