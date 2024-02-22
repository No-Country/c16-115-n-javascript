import { DataTypes, UUIDV4 } from "sequelize";
import { EventModel } from "./Event.js";
import { UserModel } from "./User.js";

export const TripModel = (sequelize) => {
  const Trip = sequelize.define("Trip", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    origin: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });

  Trip.belongsTo(EventModel(sequelize), { foreignKey: "eventId" });
  Trip.belongsTo(UserModel(sequelize), { foreignKey: "userId" });

  return Trip;
};