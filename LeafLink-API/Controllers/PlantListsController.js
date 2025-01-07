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

const { Op } = require('sequelize');

exports.create = async (req, res) => {
    if (!req.body.UserID || !req.body.PlantIDs || !Array.isArray(req.body.PlantIDs)) {
        return res.status(400).send({ error: "UserID and PlantIDs array are required" });
    }
    
    try {
        const user = await db.users.findByPk(req.body.UserID);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        const plants = await db.plants.findAll({ where: { PlantID: { [Op.in]: req.body.PlantIDs } } });
        if (plants.length !== req.body.PlantIDs.length) {
            return res.status(400).send({ error: "One or more PlantIDs are invalid" });
        }

        const newPlantlists = req.body.PlantIDs.map(plantID => ({
            UserID: req.body.UserID,
            PlantID: plantID
        }));

        // Using a transaction to ensure atomicity
        const t = await db.sequelize.transaction();
        try {
            const createdPlantlists = await db.plantlists.bulkCreate(newPlantlists, { transaction: t });
            await t.commit();
            res.status(201).location(`${Utils.getBaseURL(req)}/plantlists`).send({ plantListIDs: createdPlantlists.map(pl => pl.PlantListID) });
        } catch (error) {
            await t.rollback();
            console.error(error);
            res.status(500).send({ error: "An error occurred while creating plant lists" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An unexpected error occurred" });
    }
};

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

exports.update = async (req, res) => {
    const { UserID, PlantIDs } = req.body;

    // Validate the input
    if (!UserID || !Array.isArray(PlantIDs)) {
        return res.status(400).send({ error: "UserID and PlantIDs array are required" });
    }

    try {
        // Check if the user exists
        const user = await db.users.findByPk(UserID);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }

        // Find the existing plant list for the user
        const existingPlantLists = await db.plantlists.findAll({ where: { UserID: UserID } });

        // Get existing PlantIDs in the user's plant list
        const existingPlantIDs = existingPlantLists.map(pl => pl.PlantID);

        // Merge new PlantIDs, avoiding duplicates
        const updatedPlantIDs = [...new Set([...existingPlantIDs, ...PlantIDs])];

        // Update or add plant list entries without removing existing entries
        const t = await db.sequelize.transaction();
        try {
            // We no longer need to destroy the old entries
            // Insert the updated plant list entries (only the new/merged IDs)
            const newPlantLists = updatedPlantIDs.map(plantID => ({
                UserID: UserID,
                PlantID: plantID
            }));

            // Use bulkCreate with "ignoreDuplicates" to avoid inserting duplicates
            await db.plantlists.bulkCreate(newPlantLists, { transaction: t, ignoreDuplicates: true });

            await t.commit();
            return res.status(200).send({ message: "Plant list updated successfully", plantListIDs: updatedPlantIDs });
        } catch (error) {
            await t.rollback();
            console.error(error);
            return res.status(500).send({ error: "An error occurred while updating the plant list" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "An unexpected error occurred" });
    }
};