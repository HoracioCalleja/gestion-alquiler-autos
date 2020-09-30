module.exports = class Alquiler{
  constructor({
    id,
    Auto,
    Cliente,
    precioUnitario,
    desde,
    hasta,
    medioDePago,
    pagado,
    precioTotal,
  }){
    this.id = id;
    this.Auto = Auto;
    this.Cliente = Cliente;
    this.precioUnitario = precioUnitario;
    this.desde = desde;
    this.hasta = hasta;
    this.medioDePago = medioDePago;
    this.pagado = pagado;
    this.precioTotal = precioTotal;
    }
}