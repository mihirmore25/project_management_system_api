module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        status: {
            type: DataTypes.ENUM("To Do", "In Progress", "Done"),
            allowNull: false,
            defaultValue: "To Do",
        },
    });

    Task.associate = (models) => {
        Task.belongsTo(models.Project, { foreignKey: "projectId" });
    };

    return Task;
};
