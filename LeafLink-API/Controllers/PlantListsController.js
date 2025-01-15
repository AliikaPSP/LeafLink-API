const { db } = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
    const plantlists = await db.plantlists.findAll();
    console.log(plantlists);
    res.send(plantlists.map(({ PlantListID, UserID, PlantID }) => { return { PlantListID, UserID, PlantID } }));
}

exports.getById = async (req, res) => {
    const plantlist = await getPlantlist(req, res);
    if (!plantlist) {
      return res.status(404).send({ error: "Plant list not found" });
    }
    return res.send({
      PlantListID: plantlist.PlantListID,
      UserID: plantlist.UserID,
      PlantID: plantlist.PlantID,
    });
};
  

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

        const newPlantlist = await db.plantlists.create({
            UserID: req.body.UserID,
            PlantID: req.body.PlantIDs,  // Store the array of selected plant IDs
        });

        res.status(201).send(newPlantlist);  // Return the created plant list
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "An unexpected error occurred" });
    }
};


// exports.create = async (req, res) => {
//     if (!req.body.UserID || !req.body.PlantIDs || !Array.isArray(req.body.PlantIDs)) {
//         return res.status(400).send({ error: "UserID and PlantIDs array are required" });
//     }
    
//     try {
//         const user = await db.users.findByPk(req.body.UserID);
//         if (!user) {
//             return res.status(404).send({ error: "User not found" });
//         }

//         const plants = await db.plants.findAll({ where: { PlantID: { [Op.in]: req.body.PlantIDs } } });
//         if (plants.length !== req.body.PlantIDs.length) {
//             return res.status(400).send({ error: "One or more PlantIDs are invalid" });
//         }

//         const newPlantlists = await db.plantlists.create({
//             UserID: req.body.UserID,
//             PlantID: req.body.PlantIDs,
//         });
        

//         // Using a transaction to ensure atomicity
//         const t = await db.sequelize.transaction();
//         try {
//             const createdPlantlists = await db.plantlists.bulkCreate(newPlantlists, { transaction: t });
//             await t.commit();
//             res.status(201).location(`${Utils.getBaseURL(req)}/plantlists`).send({ plantListIDs: createdPlantlists.map(pl => pl.PlantListID) });
//         } catch (error) {
//             await t.rollback();
//             console.error(error);
//             res.status(500).send({ error: "An error occurred while creating plant lists" });
//         }
//     } catch (error) {
//         console.error(error);
//         res.status(500).send({ error: "An unexpected error occurred" });
//     }
// };

exports.editById = async (req, res) => {
    const plantlist = await getPlantlist(req, res);
    if (!plantlist) {
        return res.status(404).send({ error: "Plant list not found" });
    }
    
    if (!req.body.UserID || !req.body.PlantID) {
        return res.status(400).send({ error: "One or more parameters are missing" });
    }
    
    plantlist.UserID = req.body.UserID;
    plantlist.PlantID = req.body.PlantID;
    
    try {
        await plantlist.save();
        return res.status(200)
          .location(`${Utils.getBaseURL(req)}/plantlists/${plantlist.PlantListID}`)
          .send(plantlist);
    } catch (error) {
        console.error("Error saving plant list:", error);
        return res.status(500).send({ error: "Failed to update plant list" });
    }
};

exports.deleteById = async (req, res) => {
    const plantlist = await getPlantlist(req, res);
    if (!plantlist) { return; }
    await plantlist.destroy();
    return res.status(204).send();  // 204 No Content status code
}

const getPlantlist = async (req, res) => {
    const idNumber = parseInt(req.params.id);
    if (isNaN(idNumber)) {
        res.status(400).send({ error: `Invalid plant list ID ${req.params.id}` });
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
    const { UserID, PlantID } = req.body;
  
    if (!UserID || !PlantID) {
      return res.status(400).send({ error: "UserID and PlantID are required" });
    }
  
    try {
      const plantlist = await db.plantlists.findByPk(req.params.id);
  
      if (!plantlist) {
        return res.status(404).send({ error: "Plant list not found" });
      }
  
      plantlist.UserID = UserID;
      plantlist.PlantID = PlantID;
  
      await plantlist.save();
  
      return res.status(200).send({
        message: "Plant list updated successfully",
        plantList: {
          PlantListID: plantlist.PlantListID,
          UserID: plantlist.UserID,
          PlantID: plantlist.PlantID,
        },
      });
    } catch (error) {
      console.error("Error updating plant list:", error);
      return res.status(500).send({ error: "An error occurred while updating the plant list" });
    }
};  