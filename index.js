const port = 8080;
const app = require('express')();
//npm install swagger-ui-express 
const swaggerUI = require
('swagger-ui-express');
const swaggerDoc = require("./docs/swagger.json");

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.get('/plants', (req, res) => {res.send(["Rose", "Lily","Tulip"]
     /* [
    {PlantID: 1, PlantName: "Rose", 
    Description: "This is a beautiful rose plant.", Size: "Medium", 
    PlantRequirements: "Water, Soil, Light", PlantInstructions:"Water 5-6 times a week, Light: indirect"},
    {PlantID: 2, PlantName: "Lily", 
        Description: "This is a beautiful lily plant.", Size: "Large",  
        PlantRequirements: "Water, Light", PlantInstructions:"A body of water. Light: indirect"},
    {PlantID: 3, PlantName: "Tulips", 
        Description: "This is a beautiful tulip plant.", Size: "Small",  
        PlantRequirements: "Water, Soil, Light", PlantInstructions:"Water 2 times a week. Light: indirect"}
    ] */ )});

app.listen(port, () => {console.log(`Api on saadaval aadressil: http://localhost:${port} `);});    