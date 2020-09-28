const AbstractController = require("../../abstractController");
const { fromDataToEntity } = require("../Maper/alquilerMapper");
const ClienteService = require("../../cliente/Service/clienteService");
const AutoService = require("../../auto/Service/autoService");

module.exports = class AlquilerController extends AbstractController {
  constructor(alquilerService, autoService, clienteService) {
    super();
    this.clienteService = clienteService;
    this.alquilerService = alquilerService;
    this.autoService = autoService;
    this.BASE_ROUTE = "/alquiler";
  }

  configureRoutes(app) {
    let ROUTE = this.BASE_ROUTE;
    app.get(`${ROUTE}/create`, this.create.bind(this));
    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/:id`, this.view.bind(this));
    app.post(`${ROUTE}/save`, this.save.bind(this));
    app.get(`${ROUTE}/delete/:id`, this.delete.bind(this));
  }

  async index(req, res) {
    // let { errors, messages } = req.session;
    let alquileres = await this.alquilerService.getAll();
    res.json(alquileres);
    // res.status(200).render("alquiler/View/index.html", {
    //   data: {
    //     alquileres,
    //     errors,
    //     messages,
    //   },
    // });
    // req.session.errors = [];
    // req.session.messages = [];
  }

  async view(req, res) {
    // try {
    const { id } = req.params;
    const alquiler = await this.alquilerService.getById(id);
    res.json(alquiler);
    //   res.render("auto/View/form.html", {
    //     data: {
    //       auto,
    //     },
    //   });
    // } catch (e) {
    //   throw new Error(`Error : ${e.message}`);
    // }
  }

  async create(req, res) {
    const autos = await this.autoService.getAll();
    const clientes = await this.clienteService.getAll();
    console.log("autos y clientes", autos, clientes);
    if (autos.length > 0 && clientes.length > 0) {
      res.render("alquiler/View/form.html", {
        data: {
          autos,
          clientes,
        },
      });
    } else {
      // req.session.errors = "Se debe crear al menos un auto y un cliente para generar un alquiler";
      res.redirect(this.BASE_ROUTE);
    }
  }

  async save(req, res) {
    try{
      let alquilerData = req.body;
      let alquilerEntity = fromDataToEntity(alquilerData);
      let alquilerSaved = await this.alquilerService.save(alquilerEntity);
      res.json(await alquilerSaved);
    } catch(e){
      console.error(e);
      console.error(e.message);
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async delete(req, res) {
    // try {
    //   const { id } = req.params;
    //   const auto = await this.autoService.getById(id);
    //   // console.log(auto);
    //   await this.autoService.delete(auto);
    //   req.session.messages = [`Se eliminó el auto con el id ${id}`];
    //   res.redirect("/auto");
    // } catch (e) {
    //   // console.error(e);
    //   req.session.errors = [e.message];
    //   res.redirect("/auto");
    // }
  }
};
