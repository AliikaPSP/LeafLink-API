const {db} = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
    const plants = await db.plants.findAll();
    console.log(plants);
    res.send(plants.map(({PlantID, PlantName}) =>
         {return {PlantID, PlantName}}))
}

exports.getById = async (req, res) => {
    const plant = await getPlant(req, res);
    if (!plant) { return };
    return res.send(plant);
}

exports.create = async (req, res) => {
    if (!req.body.PlantName || 
        !req.body.Description || 
        !req.body.Size || 
        !req.body.PlantRequirements ||
        !req.body.PlantInstructions) 
        { return res.send(400).send({error: "One or multiple parameters are missing"}); }
    
    let newPlant = {
        PlantName: req.body.PlantName,
        Description: req.body.Description,
        Size: req.body.Size,
        PlantRequirements: req.body.PlantRequirements,
        PlantInstructions: req.body.PlantInstructions
    }
    const createdPlant = await db.plants.create(newPlant);
    // res.status(201)
    //     .location(`${Utils.getBaseURL(req)}/plants/${createdPlant.PlantID}`)
    //     .send(createdPlant.PlantID);
    res
    .location(`${Utils.getBaseUrl(req)}/plants/${createdPlant.PlantID}`)
    .sendStatus(201);
}

exports.editById = async (req, res) => {
    const plant = await getPlant(req, res);
    if (!plant) { return };
    if (!req.body.PlantName ||
        !req.body.Description ||
        !req.body.Size ||
        !req.body.PlantRequirements ||
        !req.body.PlantInstructions) 
    {return res.send(400).send({error: "One or multiple parameters are missing"}); }
    plant.PlantName = req.body.PlantName,
    plant.Description = req.body.Description,
    plant.Size = parseInt(req.body.Size),
    plant.PlantRequirements = req.body.PlantRequirements,
    plant.PlantInstructions = req.body.PlantInstructions
    await plant.save();
    return res.status(201)
        .location(`${Utils.getBaseUrl(req)}/plants/${plant.PlantID}`)
        .send(plant);
}

exports.deleteById = async (req, res) => {
    const plant = await getPlant(req, res);
    if (!plant) { return };
    await plant.destroy();
    return res.status(204).send({error: "No content"});  //204 No Content status code
}



const getPlant = async (req, res) => {
    const idNumber = parseInt(req.params.id);
    if(isNaN(idNumber)) {
        res.status(400).send({error: `Invalid plant ID ${req.params.PlantID}`});
        return null;
    }
    const plant = await db.plants.findByPk(idNumber);
    if (!plant) {
        res.status(404).send({error: "Plant not found"});
        return null;
    }
    return plant;
}