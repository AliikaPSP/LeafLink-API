const port = 8080;
const app = require('express')();
//npm install swagger-ui-express 
const swaggerUI = require
('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDoc = yamljs.load('./docs/swagger.yaml');
var express = require('express');

const plants = [

    {
        PlantID: 1, 
        PlantName: "Rose", 
        Description: "This is a beautiful rose plant.", 
        Size: "Medium", 
        PlantRequirements: "Water, Soil, Light", 
        PlantInstructions:"Water 5-6 times a week, Light: indirect"
    },
    {
        PlantID: 2, 
        PlantName: "Lily", 
        Description: "This is a beautiful lily plant.", 
        Size: "Large",  
        PlantRequirements: "Water, Light", 
        PlantInstructions:"A body of water. Light: indirect"
    },
    {
        PlantID: 3, 
        PlantName: "Tulips", 
        Description: "This is a beautiful tulip plant.", 
        Size: "Small",  
        PlantRequirements: "Water, Soil, Light", 
        PlantInstructions:"Water 2 times a week. Light: indirect"
    }
    
]

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.json()); //for parsing application/json

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

//create
app.post('/plants', (req, res) => {
    if (!req.body.PlantName || 
        !req.body.Description || 
        !req.body.Size || 
        !req.body.PlantRequirements ||
        !req.body.PlantInstructions) {
        return res.send(400).send({error: "One or multiple parameters are missing"});
    }
    
    let plant = {
        PlantID: plants.length + 1,
        PlantName: req.body.PlantName,
        Description: req.body.Description,
        Size: req.body.Size,
        PlantRequirements: req.body.PlantRequirements,
        PlantInstructions: req.body.PlantInstructions
    }
    plants.push(plant);
    res.status(201).location('${getBaseURL(req)}/plants/${plants.length}').send(plant);
})

//update a plant
app.put('/plants/:id', (req, res) => {
    if (req.params.id == null) {
        return res.status(404).send({error: "Plant not found"});  //404 Not Found status code   
    }
    if (!req.body.PlantName ||
        !req.body.Description ||
        !req.body.Size ||
        !req.body.PlantRequirements ||
        !req.body.PlantInstructions) {
        return res.send(400).send({error: "One or multiple parameters are missing"});
    }
    let plant = {
        PlantID: req.body.PlantID,
        PlantName: req.body.PlantName,
        Description: req.body.Description,
        Size: req.body.Size,
        PlantRequirements: req.body.PlantRequirements,
        PlantInstructions: req.body.PlantInstructions
    }
    plants.splice((req.body.PlantID-1), 1, plant);
    res.status(201)
        .location('${getBaseURL(req)}/plants/${plants.length}').send(plant);

})

//Delete a plant
app.delete('/plants/:id', (req, res) => {
    if(typeof plants[req.params.id-1] === 'undefined') {
        return res.status(404).send({error: "Plant not found"});  //404 Not Found status code
    }
    plants.splice((req.params.id-1), 1);

    res.status(204).send({error: "No content"}); //204 No Content status code
})

app.listen(port, () => {console.log(`Api on saadaval aadressil: http://localhost:${port} `);});    

function getBaseURL(req) 
{
    return req.connection && req.connection.encrypted ?
    "https" : "http" + `://${req.headers.host}`;
}
