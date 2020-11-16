const AbstractController = require('../../abstractController');
const { fromDataToEntity } = require('../Maper/autoMapper');

module.exports = class AutoController extends AbstractController {
  constructor(autoService) {
    super();
    this.autoService = autoService;
    this.BASE_ROUTE = '/auto';
  }

  configureRoutes(app) {
    let ROUTE = this.BASE_ROUTE;
    app.get(`${ROUTE}/create`, this.create.bind(this));
    app.get(`${ROUTE}/available`, this.availableCars.bind(this));
    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/:id`, this.view.bind(this));
    app.post(`${ROUTE}/save`, this.save.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async index(req, res) {
    const autos = await this.autoService.getAll();
    let { errors, messages } = req.session;
    res.render('auto/View/index.html', {
      data: {
        autos,
        errors,
        messages,
      },
    });
    req.session.errors = [];
    req.session.messages = [];
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async view(req, res) {
    try {
      const { id } = req.params;
      const auto = await this.autoService.getById(id);
      res.render('auto/View/form.njk', {
        data: {
          auto,
        },
      });
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/auto');
    }
  }

  /**
   * @param {import('express').Response} res
   */

  async create(req, res) {
    res.render('auto/View/form.njk');
  }


  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async save(req, res) {
    try {
      let autoData = req.body;
      let autoEntity = fromDataToEntity(autoData);
      let savedAuto = await this.autoService.save(autoEntity);
      if (autoEntity.id) {
        req.session.messages = [`Se actualizó el auto con el id ${autoEntity.id}`];
      } else {
        req.session.messages = [`Se creó el auto con el id ${savedAuto.id}`];
      }
      res.redirect('/auto');
    } catch (e) {
      req.session.errors = [e.message, e.stack];
      res.redirect('/auto');
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async delete(req, res) {
    try {
      const { id } = req.params;
      const auto = await this.autoService.getById(id);
      await this.autoService.delete(auto);
      req.session.messages = [`Se eliminó el auto con el id ${id}`];
      res.redirect('/auto');
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect('/auto');
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async availableCars(req, res) {
    try {
      const cars = await this.autoService.getAvailableCars();
      res.json(cars);
    } catch (e) {
      console.log(e.message);
    }
  }
};
