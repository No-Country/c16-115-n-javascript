import express from 'express'
import cors from 'cors'
import logger from 'morgan'
import morgan from 'morgan'
// const path = require('path')
import Routes from './routes/index.js'

const server = express()

server.use(cors())

server.use(morgan('dev'))

server.use(logger('dev'))

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
       'Access-Control-Allow-Headers',
       'Origin, X-Requested-With, Content-Type, Accept'
    );
    res.header(
       'Access-Control-Allow-Methods',
       'GET, POST, OPTIONS, PUT, DELETE'
    );
    next();
});

server.use(express.json())
  
server.use(Routes)


export default server