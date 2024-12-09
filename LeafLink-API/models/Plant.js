module.exports = (sequelize, DataTypes) => {
    const Plant = sequelize.define(
        'Plant',
        {
            PlantID:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            PlantName:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            Description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            Size:{
                type: DataTypes.ENUM('Small', 'Medium', 'Large'),
                allowNull: false,
            },
            PlantRequirements:{
                type: DataTypes.TEXT,
                allowNull: false,
            },
            PlantInstructions:{
                type: DataTypes.TEXT,
                allowNull: false,
            }  
        },
        {
            timestamps: true,
        }
    );

    console.log(Plant === sequelize.models.Plant);
    return Plant;
}