const Alquiler = require("../Entity/Alquiler");

function fromModelToEntity(alquilerModel) {
  return new Alquiler(alquilerModel.toJSON());
}

function fromDataToEntity({
  id,
}) {
  return new Alquiler({
    id: Number(id),
  });
}

module.exports = {
  fromModelToEntity,
  fromDataToEntity,
};
