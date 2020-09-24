const AbstractController = require("../../abstractController");
const { fromDataToEntity } = require("../Maper/clienteMapper");

module.exports = class ClienteController extends AbstractController {
  constructor(clienteService) {
    super();
    this.clienteService = clienteService;
    this.BASE_ROUTE = "/cliente";
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
    // res.status(200).send("Hello client")
    const clientes = await this.clienteService.getAll();
    let { errors, messages } = req.session;
    res.status(200).render("cliente/view/index.html", {
      data: {
        clientes,
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
      const cliente = await this.clienteService.getById(id);
      res.status(200).json(cliente);
      // res.render("cliente/view/form.html", {
      //   data: {
      //     cliente,
      //   },
      // });
    } catch (e) {
      throw new Error(`Error : ${e.message}`);
    }
  }

  async create(req, res) {
    res.render("cliente/view/form.html");
  }

  async save(req, res) {
    try {
      let clienteData = req.body;
      // clienteData["fecha-nacimiento"] = `"${clienteData["fecha-nacimiento"]}"`;
      let clienteEntity = fromDataToEntity(clienteData);
      let savedCliente = await this.clienteService.save(clienteEntity);
      console.log(savedCliente);
      if (clienteEntity.id) {
        req.session.messages = [
          `Se actualizó el cliente con el id ${clienteEntity.id}`,
        ];
        // console.log(req.session.messages);
      } else {
        req.session.messages = [
          `Se creó el cliente con el id ${savedCliente.id}`,
        ];
      }
      res.redirect("/cliente");
      res.status(200).send(`Hola ${clienteEntity.nombre}`);
    } catch (e) {
      console.log(e.message);
      req.session.errors = [e.message, e.stack];
      res.redirect("/cliente");
    }
  }

  /**
   * @param {import('express').Request} req
   * @param {import('express').Response} res
   */

  async delete(req, res) {
    try {
      const { id } = req.params;
      const cliente = await this.clienteService.getById(id);
      // console.log(cliente);
      await this.clienteService.delete(cliente);
      req.session.messages = [`Se eliminó el cliente con el id ${id}`];
      res.status(200).send(`Cliente con ID: ${id} eliminado.`);
      // res.redirect("/cliente");
    } catch (e) {
      console.error(e);
      req.session.errors = [e.message];
      // res.redirect("/cliente");
    }
  }
};
