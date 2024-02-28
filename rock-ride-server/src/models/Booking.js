import { DataTypes, UUIDV4 } from "sequelize";

import { UserModel } from "./User.js";
import { TripModel } from "./Trip.js";

export const BookingModel = (sequelize) => {
  const Booking = sequelize.define("Booking", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "accepted", "rejected"),
      allowNull: false,
      defaultValue: "pending",
    },
  });

  Booking.belongsTo(TripModel(sequelize), { foreignKey: "tripId" });
  Booking.belongsTo(UserModel(sequelize), { foreignKey: "userId" });

  return Booking;
};
