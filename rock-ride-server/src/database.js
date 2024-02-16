import { Sequelize } from "sequelize"
import dotenv from "dotenv"
import { UserModel } from "./models/User.js"

dotenv.config()

// const { DB_USER, DB_PASSWORD, DB_HOST } = process.env

// export const sequelize = new Sequelize(
//   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/drive-rock`,
//   { logging: false, native: false }
// )

const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false, native: false })


UserModel(sequelize)


export const { User } = sequelize.models


export const conn = sequelize
