const AbstractController = require("../../abstractController");
const { fromDataToEntity } = require("../Maper/alquilerMapper");
const ClienteService = require ("../../cliente/Service/clienteService");
const AutoService = require ("../../auto/Service/autoService");

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
    res.status(200).send({"Greet" : "Hello from Alquiler" })
    // const autos = await this.autoService.getAll();
    // let { errors, messages } = req.session;
    // res.status(200).render("auto/View/index.html", {
    //   data: {
    //     autos,
    //     errors,
    //     messages,
    //   },
    // });
    // req.session.errors = [];
    // req.session.messages = [];
  }

  async view(req, res) {
    // try {
    //   const { id } = req.params;
    //   const auto = await this.autoService.getById(id);
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
    // console.log("En create");
    // res.render("auto/View/form.html");
  }

  async save(req, res) {
    // res.send(req.body);
    // try {
    // let autoData = req.body;
    //   console.log("From post: ",autoData);
    //   let autoEntity = fromDataToEntity(autoData);
    //   console.log("From map: ",autoEntity);
    //   let savedAuto = await this.autoService.save(autoEntity);
    //   // console.log(savedAuto)
    //   if (autoEntity.id) {
    //     req.session.messages = [
    //       `Se actualizó el auto con el id ${autoEntity.id}`,
    //     ];
    //     // console.log(req.session.messages);
    //   } else {
    //     req.session.messages = [`Se creó el auto con el id ${savedAuto.id}`];
    //   }
    //   res.redirect("/auto");
    // } catch (e) {
    //   // console.log(e.message)
    //   req.session.errors = [e.message, e.stack];
    //   res.redirect("/auto");
    // }
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