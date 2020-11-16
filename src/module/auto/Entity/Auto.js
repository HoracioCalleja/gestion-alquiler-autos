module.exports = class Auto {

  constructor(
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
  )

  {
    this.id = id;
    this.marca = marca;
    this.modelo = modelo;
    this.anio = anio;
    this.kms = kms;
    this.color = color;
    this.aireAcondicionado = aireAcondicionado;
    this.pasajeros = pasajeros;
    this.esAutomatico = esAutomatico;
    this.activo = activo;
    this.rentado = rentado;
    this.precioPorDia = precioPorDia;
  }
}