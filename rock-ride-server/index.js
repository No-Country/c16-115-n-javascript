import server from './src/app.js'
import { conn } from './src/database.js'
// const { createServer } = require('node:http')
// const { Server } = require('socket.io')


// const { getMessaging } = require('firebase-admin/messaging')

// require('dotenv').config()


// require('./rock-ride-server/src/web-sockets/socket.js')

const PORT = process.env.PORT | 3001

conn.sync({ alter: true })
  .then(() => {
    console.log("DB Connect");
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
