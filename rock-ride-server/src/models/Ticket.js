import { DataTypes, UUIDV4 } from "sequelize";


export const TicketModel = (sequelize) => {
  const Ticket = sequelize.define("Ticket", {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    eventId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  });


  return Ticket;
};
