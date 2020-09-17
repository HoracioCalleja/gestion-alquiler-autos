module.exports = class Auto{
  constructor({
    id,
    marca,
    modelo,
    anio,
    kms,
    color,
    aireAcondicionado,
    pasajeros,
    esAutomatico
  }){
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.anio = anio;
    this.kms = kms;
    this.color = color;
    this.aireAcondicionado = aireAcondicionado;
    this.pasajeros = pasajeros;
    this.esAutomatico = esAutomatico;
  }
}