const AbstractController = require("../../abstractController");

module.exports = class AutoController extends AbstractController {
  constructor(autoService) {
    super();
    this.autoService = autoService;
    this.BASE_ROUTE = "/auto";
  }

  configureRoutes(app){
    let ROUTE = this.BASE_ROUTE;
    app.get(`${ROUTE}`, this.index.bind(this));
    app.get(`${ROUTE}/:id`, this.view.bind(this));
  }

  async index(req,res){
    const autos = await this.autoService.getAll();
    // res.status(200).render("auto/view/index.html", {data : {
    //   autos
    // }})
    res.status(200).send(autos);
  }

  async view (req,res){
    const { id } = req.params;
    const auto = await this.autoService.getById(id);
    res.status(200).send(auto);
  }

  async create (){

  }

  async save (){

  }

  async delete (){

  }

};
