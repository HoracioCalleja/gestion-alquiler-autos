const AbstractController = require("../../abstractController");

module.exports = class AutoController extends AbstractController {
  constructor() {
    super();
    // this.autoService = autoService;
    this.BASE_ROUTE = "/auto";
  }

  configureRoutes(app){
    let ROUTE = this.BASE_ROUTE;
    app.get(`${ROUTE}`, this.index.bind(this));
  }

  async index(req,res){
    res.status(200).send("Hola desde /auto")
  }

};
