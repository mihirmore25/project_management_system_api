module.exports = (sequelize, DataTypes) => {
    const UserProject = sequelize.define("UserProject", {
        role: {
            type: DataTypes.STRING,
            defaultValue: "collaborator",
        },
    });

    return UserProject;
};
