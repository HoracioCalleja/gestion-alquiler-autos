const express = require ('express');
const configureDI = require ('../config/di')

const PORT = process.env.PORT | 8080;

const app = express();

// app.use(express.json());

const container = configureDI();

const controller = container.get("AutoController");

controller.configureRoutes(app);


app.listen(PORT, () => console.log(`Listening to the port ${PORT}`))