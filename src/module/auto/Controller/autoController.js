const AbstractController = require("../../abstractController");

module.exports = class AutoController extends AbstractController {
  constructor(autoService) {
    super();
    this.autoService = autoService;
    this.BASE_ROUTE = "/auto";
  }

  configureRoutes(app) {
    let ROUTE = this.BASE_ROUTE;
    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/:id`, this.view.bind(this));
  }

  async index(req, res) {
    const autos = await this.autoService.getAll();
    // let errors
    // let { errors, messages } = req.session;
    res.status(200).render("auto/view/index.html", {
      data: {
        autos,
      },
      // errors,
      // messages
    });
    // res.status(200).send(autos);
    // req.session.errors = [];
    // req.session.messages = [];
  }

  async view(req, res) {
    const { id } = req.params;
    const auto = await this.autoService.getById(id);
    res.render("auto/view/form.html", {data : {
      auto, 
    }})
    // res.status(200).send(auto);
  }

  async create() {}

  async save() {}

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
    } catch (e) {
      req.session.errors = [e.message];
      res.redirect("/auto");
    }
  }
};
