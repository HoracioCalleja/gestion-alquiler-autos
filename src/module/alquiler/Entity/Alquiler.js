module.exports = class Alquiler{
  constructor({
    id,
    auto_id,
    cliente_id,
    precioUnitario,
    desde,
    hasta,
    medioDePago,
    pagado,
    precioTotal,
  }){
    this.id = id;
    this.auto_id = auto_id;
    this.cliente_id = cliente_id;
    this.precioUnitario = precioUnitario;
    this.desde = desde;
    this.hasta = hasta;
    this.medioDePago = medioDePago;
    this.pagado = pagado;
    this.precioTotal = precioTotal;
    }
}