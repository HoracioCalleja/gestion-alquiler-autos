const Auto = require('../../Entity/Auto');

module.exports = function createFakeCar(id) {
  return new Auto(id, 'Pegueot', 'Mock 2017', 2018, 3500, 'Negro', 4, 'SI', 'SI', 'SI', 'NO', 2500);
};
