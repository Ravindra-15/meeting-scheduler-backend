import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../../config/database";
import { User } from "../../user/module/user.model";

export class Meeting extends Model {}

Meeting.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: "meetings",
    indexes: [
      { fields: ["userId", "startTime", "endTime"] }
    ]
  }
);

User.hasMany(Meeting, { foreignKey: "userId" });
Meeting.belongsTo(User, { foreignKey: "userId" });