const PlantController = require('../Controllers/PlantsController');

module.exports = (app) => {
    app.route("/plants")
        .get(PlantController.getAll)
        .post(PlantController.create)
    app.route("/plants/:id")
        .get(PlantController.getById)
        .put(PlantController.editById)
        .delete(PlantController.deleteById)
}