const {db} = require("../db");
const Utils = require("../utils");

exports.getAll = async (req, res) => {
    const users = await db.users.findAll();
    res.send(users.map(({id, name}) => {return {id, name}}))
}

exports.getById = async (req, res) => {
    const user = await getUser(req, res);
    if (!user) { return };
    return res.send(user);
}

exports.create = async (req, res) => {
    if (!req.body.FirstName || 
        !req.body.LastName || 
        !req.body.UserName || 
        !req.body.Email ||
        !req.body.Password ||
        !req.body.PlantList) 
        { return res.send(400).send({error: "One or multiple parameters are missing"}); }
    
    let newUser = {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        UserName: req.body.UserName,
        Email: req.body.Email,
        Password: req.body.Password,
        PlantList: req.body.PlantList,
    }
    const createdUser = await db.users.create(newUser);
    res.status(201)
        .location(`${Utils.getBaseURL(req)}/users/${createdUser.UserID}`)
        .send(createdUser.UserID);
}

exports.editById = async (req, res) => {
    const user = await getUser(req, res);
    if (!user) { return };
    if (!req.body.FirstName ||
        !req.body.LastName ||
        !req.body.UserName ||
        !req.body.Email ||
        !req.body.Password||
        !req.body.PlantList ||) 
    {return res.send(400).send({error: "One or multiple parameters are missing"}); }
    user.FirstName = req.body.FirstName,
    user.LastName = req.body.LastName,
    user.UserName = req.body.UserName,
    user.Email = req.body.Email,
    user.Password= req.body.Password,
    user.PlantList = req.body.PlantList
    await user.save();
    return res.status(201)
        .location(`${Utils.getBaseURL(req)}/users/${user.UserID}`)
        .send(user);
}

exports.deleteById = async (req, res) => {
    const user = await getUser(req, res);
    if (!user) { return };
    await user.destroy();
    return res.status(204).send({error: "No content"});  //204 No Content status code
}



const getUser = async (req, res) => {
    const idNumber = parseInt(req.params.UserID);
    if(isNaN(idNumber)) {
        res.status(400).send({error: `Invalid user ID ${req.params.UserID}`});
        return null;
    }
    const user = await db.users.findByPk(idNumber);
    if (!user) {
        res.status(404).send({error: "User not found"});
        return null;
    }
    return user;
}