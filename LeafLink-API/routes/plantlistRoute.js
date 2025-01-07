const PlantListsController = require('../Controllers/PlantListsController');

module.exports = (app) => {
    app.route("/plantlists")
        .get(PlantListsController.getAll)
        .post(PlantListsController.create)
    app.route("/plantlists/:id")
        .get(PlantListsController.getById)
        .put(PlantListsController.editById)
        .delete(PlantListsController.deleteById)
    app.route("/plantlists/update")
        .patch(PlantListsController.update)
}