module.exports = class Car{
  constructor({
    id,
    marca,
    modelo,
    año,
    kms,
    color,
    aireAcondicionado,
    pasajeros,
    cambioAutomatico
  }){
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.año = año;
    this.kms = kms;
    this.color = color;
    this.aireAcondicionado = aireAcondicionado;
    this.pasajeros = pasajeros;
    this.cambioAutomatico = cambioAutomatico;
  }
}