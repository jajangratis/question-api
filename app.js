const express = require('express');
const morgan = require('morgan');
const bParser = require('body-parser');
const timeout = require('connect-timeout'); //express v4
const helmet = require('helmet')
const cors = require('cors')
const http = require('http')
require('dotenv').config()

// const client = require('./config/redis')

// IMPORT CERTIFICATE

const router = require('./routes/router');

function haltOnTimedout(req, res, next){
    if (!req.timedout) next();
}

/**
 * Express Config
 */
let app = express();
app.disable('x-powered-by')
app.use(morgan('combined'));
app.use(bParser.json({limit:'220mb'}));
app.use(bParser.urlencoded({ extended: true }));
app.use(cors())
app.use('/static', express.static('uploads'))
app.use('/assets', express.static('assets'))
app.use('/file', express.static('assets/files'))
app.use(helmet())
app.set('view engine', 'ejs')

/**
 * End Point Access
 */
app.use('/profiling/api/v1', router);
app.use(timeout(400000));
app.use(haltOnTimedout);



/**
 * Run Server
 */
const port = 4000

let httpServer = http.createServer(app);
httpServer.listen(port, () => {
    console.log(`listening on ${port}`);
});
console.log({NODE_ENV:process.env.NODE_ENV,PORT:process.env.PORT,DB_TYPE:process.env.DB_TYPE,DB_SELECT:process.env.DB_SELECT,DB_USERNAME:process.env.DB_USERNAME})

// client.on('connect', function() {
//     console.log('redis connected to '+ process.env.REDIS_PORT );
// });

// client.on('error', function (err) {
//     console.log('Something went wrong ' + err);
// });
