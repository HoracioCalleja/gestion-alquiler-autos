const AbstractController = require('../../abstractController');
const { fromDataToEntity } = require('../Maper/alquilerMapper');

module.exports = class AlquilerController extends AbstractController {
  constructor(alquilerService, autoService, clienteService) {
    super();
    this.clienteService = clienteService;
    this.alquilerService = alquilerService;
    this.autoService = autoService;
    this.BASE_ROUTE = '/alquiler';
  }

  configureRoutes(app) {
    let ROUTE = this.BASE_ROUTE;
    app.get(`${ROUTE}/debts`, this.debts.bind(this));
    app.get(`${ROUTE}/create`, this.create.bind(this));
    app.get(`${ROUTE}/cliente/:id`, this.clientRents.bind(this));
    app.get(`${ROUTE}/:id`, this.view.bind(this));
    app.post(`${ROUTE}/save`, this.save.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
    app.get(`${ROUTE}`, this.index.bind(this));
  }

  async index(req, res) {
    let { errors, messages } = req.session;
    let alquileres = await this.alquilerService.getAll();
    res.status(200).render('alquiler/View/index.html', {
      data: {
        alquileres,
        errors,
        messages,
      },
    });
    req.session.errors = [];
    req.session.messages = [];
  }

  async view(req, res) {
    try {
      const { id } = req.params;
      const alquiler = await this.alquilerService.getById(id);
      const clientes = await this.clienteService.getAll();
      const mediosDePago = this.alquilerService.getMedioDePagoValues();
      const autos = await this.autoService.getAll();
      res.render('alquiler/View/form.html', {
        data: {
          alquiler,
          clientes,
          mediosDePago,
          autos,
        },
      });
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/alquiler');
    }
  }

  async create(req, res) {
    const autos = await this.autoService.getAll();
    const clientes = await this.clienteService.getAll();
    const mediosDePago = this.alquilerService.getMedioDePagoValues();
    if (autos.length > 0 && clientes.length > 0) {
      res.render('alquiler/View/form.html', {
        data: {
          autos,
          clientes,
          mediosDePago,
        },
      });
    } else {
      req.session.errors = ['Se debe crear al menos un auto y un cliente para generar un alquiler'];
      res.redirect(this.BASE_ROUTE);
    }
  }

  async save(req, res) {
    try {
      const alquilerData = req.body;
      const alquilerEntity = fromDataToEntity(alquilerData);
      const autoId = alquilerEntity.Auto.id;
      if (!alquilerEntity.precioUnitario) {
        const precioUnitario = await this.autoService.getPrecioUnitario(autoId);
        alquilerEntity.precioUnitario = precioUnitario;
      }
      const autoRentado = await this.autoService.changeToRented(autoId);
      const alquilerEntitySaved = await this.alquilerService.save(alquilerEntity);
      if (alquilerEntity.id) {
        req.session.messages = [`Se actualizó el alquiler con el id ${alquilerEntity.id}`];
      } else {
        req.session.messages = [`Se creó el alquiler con el id ${alquilerEntitySaved.id}`];
      }
      res.redirect('/alquiler');
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/alquiler');
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async delete(req, res) {
    try {
      const { id } = req.params;
      const alquiler = await this.alquilerService.getById(id);
      await this.alquilerService.delete(alquiler);
      req.session.messages = [`Se eliminó el alquiler con el id ${id}`];
      res.redirect('/alquiler');
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/alquiler');
    }
  }

  // TODO : Make the view for this endpoint
  async debts(req, res) {
    const rentalsInDebts = await this.alquilerService.getDebts();
    if (rentalsInDebts.length > 0) {
      res.json(rentalsInDebts);
    } else {
      req.session.messages = ['No hay ningún alquiler en deuda'];
      res.redirect('/alquiler');
    }
  }

  // TODO: add view to this endpoint
  async clientRents(req, res) {
    try {
      const { id } = req.params;
      const rents = await this.alquilerService.getClientRents(id);
      res.json(rents);
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/alquiler');
    }
  }
};
