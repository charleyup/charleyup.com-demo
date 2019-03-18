module.exports = {
    up: async (queryInterface, Sequelize) => {
        const { INTEGER, DATE, STRING, TEXT, BOOLEAN, literal, ENUM } = Sequelize;
        await queryInterface.createTable("posts", {
            id: { type: INTEGER, primaryKey: true, autoIncrement: true },
            title: { type: STRING(128), allowNull: false, unique: true},
            description: STRING(128),
            content: { type: TEXT, allowNull: false},
            classify: { type: ENUM, values: ["NOTE", "CODING", "LIVING"], defaultValue: "CODING"},
            visible: { type: BOOLEAN, defaultValue: true },
            hits: { type: INTEGER, defaultValue: 0 },
            createdAt: { type: DATE, defaultValue: literal("CURRENT_TIMESTAMP") },
            updatedAt: { type: DATE, defaultValue: literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP") }
        });
    },
    down: async (queryInterface) => {
        await queryInterface.dropTable("posts");
    }
};
