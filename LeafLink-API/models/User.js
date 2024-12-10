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
                unique: true,
            },
            Email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            Password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            PlantList: {
                type: DataTypes.ARRAY(DataTypes.INTEGER),
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