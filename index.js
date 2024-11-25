const port = 8080;
const app = require('express')();
//npm install swagger-ui-express 
const swaggerUI = require
('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDoc = yamljs.load('./docs/swagger.yaml');

const plants = [

    {
        PlantID: 1, PlantName: "Rose", 
        Description: "This is a beautiful rose plant.", 
        Size: "Medium", 
        PlantRequirements: "Water, Soil, Light", 
        PlantInstructions:"Water 5-6 times a week, Light: indirect"
    },
    {
        PlantID: 2, PlantName: "Lily", 
        Description: "This is a beautiful lily plant.", 
        Size: "Large",  
        PlantRequirements: "Water, Light", 
        PlantInstructions:"A body of water. Light: indirect"
    },
    {
        PlantID: 3, PlantName: "Tulips", 
        Description: "This is a beautiful tulip plant.", 
        Size: "Small",  
        PlantRequirements: "Water, Soil, Light", 
        PlantInstructions:"Water 2 times a week. Light: indirect"
    }
    
]

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));

app.get('/plants', (req, res) => {res.send(plants)});   
app.get('/plants/:id', (req, res) => {
    if (typeof plants[req.params.id-1]
         === 'undefined') {
        return res.status(404).send({error: "Plant not found"});  //404 Not Found status code   
    }
    if (req.params.id == null) {
        return res.status(400).send({error: "Invalid plant ID provided"});  //400 Bad Request status code
    }
    res.send(plants[req.params.id-1])
})

app.listen(port, () => {console.log(`Api on saadaval aadressil: http://localhost:${port} `);});    

