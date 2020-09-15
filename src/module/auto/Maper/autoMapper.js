const Auto = require ('../Entity/Auto');

function fromModelToEntity(car){
  return new Auto(car.toJSON());  
}

// function fromDataToEntity({
  
// }){
  
// }

module.exports = {
  fromModelToEntity,
}


