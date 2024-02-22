import { Sequelize } from "sequelize"
import dotenv from "dotenv"
import { UserModel } from "./models/User.js"
import { EventModel } from "./models/Event.js"
import { TripModel } from "./models/Trip.js"

dotenv.config()

// const { DB_USER, DB_PASSWORD, DB_HOST } = process.env

// export const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/drive-rock`,
//   { logging: false, native: false }
// )

const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false, native: false })


UserModel(sequelize)
EventModel(sequelize)
TripModel(sequelize)


export const { User, Event, Trip} = sequelize.models


export const conn = sequelize
