module.exports = (sequelize, DataTypes) => {
    const PlantList = sequelize.define(
        'PlantList',
        {
            PlantListID: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            UserID: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Users',
                    key: 'UserID',
                },
            },
            PlantID: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'Plants',
                    key: 'PlantID',
                },
            },
        },
        {
            timestamps: true,
        }
    );

    console.log(PlantList === sequelize.models.PlantList);
    return PlantList;
}