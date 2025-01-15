module.exports = (sequelize, DataTypes) => {
    const Plantlist = sequelize.define(
        'Plantlist',
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
                type: DataTypes.JSON,
                defaultValue: [],
                },
            },
        {
            timestamps: true,
        }
    );

    console.log(Plantlist === sequelize.models.Plantlist);
    return Plantlist;
}