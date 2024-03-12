import { Sequelize } from "sequelize"
import dotenv from "dotenv"
import { UserModel } from "./models/User.js"
import { EventModel } from "./models/Event.js"
import { TripModel } from "./models/Trip.js"
import { TicketModel } from "./models/Ticket.js"
import { BookingModel } from "./models/Booking.js"
import pg from 'pg';
dotenv.config()

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    native: false,
    dialectModule: pg,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
  


UserModel(sequelize)
EventModel(sequelize)
TripModel(sequelize)
TicketModel(sequelize)
BookingModel(sequelize)

export const { User, Event, Trip, Ticket, Booking} = sequelize.models


export const conn = sequelize
