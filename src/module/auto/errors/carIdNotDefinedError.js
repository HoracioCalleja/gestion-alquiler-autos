module.exports = class CarIdNotDefinedError extends Error {
  constructor(){
    super(message);
    this.name = "CarIdNotDefined";
  }
};
