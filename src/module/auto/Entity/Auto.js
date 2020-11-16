module.exports = class Auto{
   /**
   * 
   * @param {number} id 
   * @param {string} marca 
   * @param {string} modelo 
   * @param {number} anio 
   * @param {number} kms 
   * @param {string} color 
   * @param {number} pasajeros 
   * @param {string} esAutomatico 
   * @param {string} aireAcondicionado 
   * @param {string} activo 
   * @param {string} rentado 
   * @param {number} precioPorDia 
   */
  constructor({
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
  })

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