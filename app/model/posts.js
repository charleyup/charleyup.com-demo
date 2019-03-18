import Sequelize from "sequelize";
import config from "../../database/config.json";
const sequelize = new Sequelize(config[process.env.NODE_ENV]);
const { INTEGER, DATE, STRING, TEXT, BOOLEAN, literal, ENUM } = Sequelize;
const Posts = sequelize.define("posts", {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: STRING(128), allowNull: false, unique: true},
    description: STRING(128),
    content: { type: TEXT, allowNull: false},
    classify: { type: ENUM, values: ["NOTE", "CODING", "LIVING"], defaultValue: "CODING"},
    visible: { type: BOOLEAN, defaultValue: true },
    hits: { type: INTEGER, defaultValue: 0 },
    createdAt: { type: DATE, defaultValue: literal("CURRENT_TIMESTAMP") },
    updatedAt: { type: DATE }
});
export default Posts;
