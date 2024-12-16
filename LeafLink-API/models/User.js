module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            UserID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            FirstName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            LastName: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            UserName: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: 'compositeIndex',
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: 'compositeIndex',
            },
            Password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            PlantList: {
                type: DataTypes.JSON,
                defaultValue: [],
            }
        },
        {
            timestamps: true,
        }
    );

    console.log(User === sequelize.models.User);
    return User;
}