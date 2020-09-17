const express = require ('express');
const configureDI = require ('./config/di')
const { init : initAuto } = require ('./module/auto/module');
const nunjucks = require ('nunjucks');

const PORT = process.env.PORT | 8080;

const app = express();

nunjucks.configure('src/module', {
  autoescape : true,
  express : app,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('public'));

const container = configureDI();

(async () => {
  const db = container.get("Sequelize");
  const model = container.get("AutoModel");
  await db.sync()

  const ford = await model.create({
    marca: "Ford",
    modelo: "Falcon Energy",
    anio: 2018,
    kms: 40000,
    color: "Verde",
    aireAcondicionado: true,
    pasajeros: 3,
    esAutomatico: false,
  });

  const porsche = await model.create({
    marca: "Porsche",
    modelo: "UltraFast",
    anio: 2020,
    kms: 0,
    color: "Negro",
    aireAcondicionado: true,
    pasajeros: 3,
    esAutomatico: true,
  });

})()

initAuto(app,container);

// app.get('/', (req, res) => {
//   res.status(200).render('view/layout/base.html', {data : {nombre : "horacio", array : [1,2,3]}});
// })

app.listen(PORT, () => console.log(`Listening to the port ${PORT}`))