module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define("Project", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
    });

    Project.associate = (models) => {
        Project.belongsToMany(models.User, { through: "UserProject" });
        Project.hasMany(models.Task, { foreignKey: "projectId" });
    };

    return Project;
};
