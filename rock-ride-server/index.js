const server = require('./src/app')
// const { conn } = require('./src/db.js')
// const { createServer } = require('node:http')
// const { Server } = require('socket.io')


// const { getMessaging } = require('firebase-admin/messaging')

// require('dotenv').config()


// require('./rock-ride-server/src/web-sockets/socket.js')

const PORT = process.env.PORT | 3001


server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
}) 
