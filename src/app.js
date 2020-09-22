require('dotenv').config();
const express = require ('express');
const configureDI = require ('./config/di')
const { init : initAuto } = require ('./module/auto/module');
const nunjucks = require ('nunjucks');

const app = express();
const PORT = process.env.PUERTO;


app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('public'));

nunjucks.configure('src/module', {
autoescape : true,
  express : app,
});

app.use(express.json());


const container = configureDI();

app.use(container.get("Session"));

initAuto(app,container);

const controller = container.get("AutoController");

app.get('/', controller.index.bind(controller));


app.listen(PORT, () => console.log(`Listening to the port ${PORT}`))