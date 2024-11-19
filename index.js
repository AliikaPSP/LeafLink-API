const port = 8080;
const app = require('express')();
//npm install swagger-ui-express 
const swaggerUI = require
('swagger-ui-express');
const swaggerDoc = require(".docs/swagger.json");

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.listen(port, () => {console.log(`Api on saadaval aadressil: http://localhost:${port} `);});    