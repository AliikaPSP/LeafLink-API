const UserController = require('../Controllers/UsersController');

module.exports = (app) => {
    app.route("/users")
        .get(UserController.getAll)
        .post(UserController.create)
    app.route("/users/:id")
        .get(UserController.getById)
        .put(UserController.editById)
        .delete(UserController.deleteById)
}