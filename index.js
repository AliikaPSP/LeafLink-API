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

const users = [
    {
        UserID : 1,
        FirstName: "John",
        LastName: "Doe",
        UserName: "johndoe",
        Email: "john.doe@example.com",
        Password: "password123",
        PlantList: [1, 2, 3]
    },
    {
        UserID : 2,
        FirstName: "Jane",
        LastName: "Smith",
        UserName: "janesmith",
        Email: "jane.smith@example.com",
        Password: "secret123",
        PlantList: [2]
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
    const plant = getPlant(req, res);

    if (!plant) {
        return res.status(404).send({error: "Plant not found"});  //404 Not Found status code   
    }
    if (!req.body.PlantName ||
        !req.body.Description ||
        !req.body.Size ||
        !req.body.PlantRequirements ||
        !req.body.PlantInstructions) 
        {
        return res.send(400).send({error: "One or multiple parameters are missing"});
        }

    
        plant.PlantID = req.body.PlantID,
        plant.PlantName = req.body.PlantName,
        plant.Description = req.body.Description,
        plant.Size = parseInt(req.body.Size),
        plant.PlantRequirements = req.body.PlantRequirements,
        plant.PlantInstructions = req.body.PlantInstructions
    
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


//Users GET - Returns a list of all users in the API to the requesting user.
app.get('/users', (req, res) => {res.send(users)});

//Users DETAILS : As an app developer, I want to get full DETAILS of my given User to show in my app 
app.get('/users/:id', (req, res) => {
    if (typeof users[req.params.id-1]
         === 'undefined') {
        return res.status(404).send({error: "User not found"});  //404 Not Found status code   
    }
    if (req.params.id == null) {
        return res.status(400).send({error: "Invalid user ID provided"});  //400 Bad Request status code
    }
    res.send(users[req.params.id-1])
})

//Users CREATE - As an app developer, I want to be able to ADD a new User in my app
app.post('/users', (req, res) => {
    if (!req.body.FirstName || 
        !req.body.LastName || 
        !req.body.UserName || 
        !req.body.Email ||
        !req.body.Password ||
         !req.body.PlantList
    ) {
        return res.send(400).send({error: "One or multiple parameters are missing"});
    }
    
    let user = {
        UserID: users.length + 1,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        UserName: req.body.UserName,
        Email: req.body.Email,
        Password: req.body.Password,
        PlantList: req.body.PlantList || []
    }
    users.push(user);
    res.status(201).location(`${getBaseURL(req)}/users/${users.length}`).send(user);
})

//Users Update - As an app developer, I want to be able to UPDATE Users
app.put('/users/:id', (req, res) => {
    const user = getUser(req, res);

    if(!user) {
        return res.status(404).send({error: "User not found"});  //404 Not Found status code   
    }
    if (!req.body.FirstName || 
        !req.body.LastName || 
        !req.body.UserName || 
        !req.body.Email ||
        !req.body.Password ||
        !req.body.PlantList) {
        return res.send(400).send({error: "One or multiple parameters are missing"});
    }
    
        user.UserID = req.body.UserID,
        user.FirstName = req.body.FirstName,
        user.LastName = req.body.LastName,
        user.UserName = req.body.UserName,
        user.Email = req.body.Email,
        user.Password = req.body.Password,
        user.PlantList = req.body.PlantList || []
    
    plants.splice((req.body.UserID-1), 1, user);
    res.status(201)
        .location('${getBaseURL(req)}/users/${users.length}').send(user);

})

//Users DELETE - As an app developer, I want to be able to DELETE an User in my app
app.delete('/users/:id', (req, res) => {
    if(typeof users[req.params.id-1] === 'undefined') {
        return res.status(404).send({error: "User not found"});  //404 Not Found status code
    }
    users.splice((req.params.id-1), 1);

    res.status(204).send({error: "No content"}); //204 No Content status code
})


app.listen(port, () => {console.log(`Api on saadaval aadressil: http://localhost:${port} `);});    


function getBaseURL(req) 
{
    return req.connection && req.connection.encrypted ?
    "https" : "http" + `://${req.headers.host}`;
}

function getPlant(req, res) {
    const idNumber = parseInt(req.params.PlantID, 10);
    if(isNaN(idNumber)) {
        res.status(400).send({error: "Invalid plant ID provided"});
        return null;
    }
    const plant = plants.find(p => p.PlantID === idNumber);
    if (!plant) {
        res.status(404).send({error: "Plant not found"});
        return null;
    }
    return plant;
}

function getUser(req, res) {
    const idNumber = parseInt(req.params.UserID, 10);
    if(isNaN(idNumber)) {
        res.status(400).send({error: "Invalid user ID provided"});
        return null;
    }
    const user = users.find(p => p.UserID === idNumber);
    if (!user) {
        res.status(404).send({error: "User not found"});
        return null;
    }
    return user;
}