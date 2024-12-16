const { db } = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
    const plantlists = await db.plantlists.findAll();
    console.log(plantlists);
    res.send(plantlists.map(({ PlantListID, UserID, PlantID }) => { return { PlantListID, UserID, PlantID } }));
}

exports.getById = async (req, res) => {
    const plantlist = await getPlantlist(req, res);
    if (!plantlist) { return; }
    return res.send(plantlist);
}

exports.create = async (req, res) => {
    if (!req.body.UserID || !req.body.PlantID) {
        return res.status(400).send({ error: "One or more parameters are missing" });
    }
    
    let newPlantlist = {
        UserID: req.body.UserID,
        PlantID: req.body.PlantID
    }
    const createdPlantlist = await db.plantlists.create(newPlantlist);
    res.status(201)
        .location(`${Utils.getBaseURL(req)}/plantlists/${createdPlantlist.PlantListID}`)
        .send(createdPlantlist.PlantListID);
}

exports.editById = async (req, res) => {
    const plantlist = await getPlantlist(req, res);
    if (!plantlist) { return; }
    if (!req.body.UserID || !req.body.PlantID) {
        return res.status(400).send({ error: "One or more parameters are missing" });
    }
    plantlist.UserID = req.body.UserID;
    plantlist.PlantID = req.body.PlantID;
    await plantlist.save();
    return res.status(201)
        .location(`${Utils.getBaseURL(req)}/plantlists/${plantlist.PlantListID}`)
        .send(plantlist);
}

exports.deleteById = async (req, res) => {
    const plantlist = await getPlantlist(req, res);
    if (!plantlist) { return; }
    await plantlist.destroy();
    return res.status(204).send();  // 204 No Content status code
}

const getPlantlist = async (req, res) => {
    const idNumber = parseInt(req.params.PlantListID);
    if (isNaN(idNumber)) {
        res.status(400).send({ error: `Invalid plant list ID ${req.params.PlantListID}` });
        return null;
    }
    const plantlist = await db.plantlists.findByPk(idNumber);
    if (!plantlist) {
        res.status(404).send({ error: "Plant not found" });
        return null;
    }
    return plantlist;
}