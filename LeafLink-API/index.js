require('dotenv').config();

const port = process.env.PORT || 8080;
const host = 'localhost';
const express = require('express');
const app = express();
const cors = require('cors');
//npm install swagger-ui-express 
const swaggerUI = require
('swagger-ui-express');
const yamljs = require('yamljs');
const swaggerDoc = yamljs.load('./docs/swagger.yaml');

const {sync} = require('./db');

// const plants = [

//     {
//         PlantID: 1, 
//         PlantName: "Rose",
//         Description: "This is a beautiful rose plant.", 
//         Size: "Medium", 
//         PlantRequirements: "Water, Soil, Light", 
//         PlantInstructions:"Water 5-6 times a week, Light: indirect"
//     },
//     {
//         PlantID: 2, 
//         PlantName: "Lily", 
//         Description: "This is a beautiful lily plant.", 
//         Size: "Large",  
//         PlantRequirements: "Water, Light", 
//         PlantInstructions:"A body of water. Light: indirect"
//     },
//     {
//         PlantID: 3, 
//         PlantName: "Tulips", 
//         Description: "This is a beautiful tulip plant.", 
//         Size: "Small",  
//         PlantRequirements: "Water, Soil, Light", 
//         PlantInstructions:"Water 2 times a week. Light: indirect"
//     }
    
// ]

// const users = [
//     {
//         UserID : 1,
//         FirstName: "John",
//         LastName: "Doe",
//         UserName: "johndoe",
//         Email: "john.doe@example.com",
//         Password: "password123",
//         PlantList: [1, 2, 3]
//     },
//     {
//         UserID : 2,
//         FirstName: "Jane",
//         LastName: "Smith",
//         UserName: "janesmith",
//         Email: "jane.smith@example.com",
//         Password: "secret123",
//         PlantList: [2]
//     }
// ]

// const plantlists = [
//     {
//         PlantListID : 1,
//         UserID: [1],
//         PlantID: [1]
//     },
//     {
//         PlantListID : 2,
//         UserID: [2],
//         PlantID: [3]
//     }
// ]

app.use(cors());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
app.use(express.json()); //for parsing application/json

app.get('/', (req, res) => {
    res.send(`Server running. Documentation at <a href="http://${host}:${port}/docs">/docs</a>`);
})

require("./routes/plantRoutes")(app);

// //plantlists GET - Returns a list of all plantlists in the API to the requesting user.
// app.get('/plantlists', (req, res) => {res.send(plantlists)});
// //plantlists DETAILS : As an app developer, I want to get full DETAILS of my given plantlist to show in my app 
// app.get('/plantlists/:id', (req, res) => {
//     if (typeof plantlists[req.params.id-1]
//          === 'undefined') {
//         return res.status(404).send({error: "Plantlist not found"});  //404 Not Found status code   
//     }
//     if (req.params.id == null) {
//         return res.status(400).send({error: "Invalid plantlist ID provided"});  //400 Bad Request status code
//     }
//     res.send(plantlists[req.params.id-1])
// })
// //plantlists CREATE - As an app developer, I want to be able to ADD a new Plantlist in my app
// app.post('/plantlists', (req, res) => {
//     if (!req.body.PlantID || 
//         !req.body.UserID ) {
//         return res.send(400).send({error: "One or multiple parameters are missing"});
//     }
    
//     let plantlist = {
//         PlantListID: plantlists.length + 1,
//         PlantID: req.body.PlantID,
//         UserID: req.body.UserID
//     }
//     plantlists.push(plantlist);
//     res.status(201).location('${getBaseURL(req)}/plantlists/${plantlists.length}').send(plantlist);
// })

// //plantlist Update - As an app developer, I want to be able to UPDATE Plantlists
// app.put('/plantlists/:id', (req, res) => {
//     const plantlist = getPlantlist(req, res);

//     if(!plantlist) {
//         return res.status(404).send({error: "Plantlist not found"});  //404 Not Found status code   
//     }
//     if (!req.body.PlantID || 
//         !req.body.UserID ) {
//         return res.status(400).send({error: "One or multiple parameters are missing"});
//     }
//         plantlist.PlantListID = req.body.PlantListID,
//         plantlist.UserID = req.body.UserID,
//         plantlist.PlantID = req.body.PlantID
    
//     plantlists.splice((req.body.PlantListID-1), 1, plantlist);
//         res.status(201)
//         .location(`${getBaseURL(req)}/plantlists/${req.params.id}`)
//         .send(plantlist);

// })

// //plantlist DELETE - As an app developer, I want to be able to DELETE a plantlist in my app
// app.delete('/plantlists/:id', (req, res) => {
//     if(typeof plantlists[req.params.id-1] === 'undefined') {
//         return res.status(404).send({error: "Plantlist not found"});  //404 Not Found status code
//     }
//     plantlists.splice((req.params.id-1), 1);

//     res.status(204).send({error: "No content"}); //204 No Content status code
// })



app.listen(port, async() => {
    if (process.env.SYNC === 'true') {
        await sync();
    }
    console.log(`Api on saadaval aadressil: http://${host}:${port}`);
});    


// function getPlantlist(req, res) {
//     const idNumber = parseInt(req.params.id, 10);
//     if(isNaN(idNumber)) {
//         res.status(400).send({error: "Invalid plantlist ID provided"});
//         return null;
//     }
//     const plantlist = plantlists.find(p => p.PlantListID === idNumber);
//     if (!plantlist) {
//         res.status(404).send({error: "Plantlist not found"});
//         return null;
//     }
//     return plantlist;
// }
