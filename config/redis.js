const redis = require('redis')
require('dotenv').config({path:process.env.OLDPWD+'/.env'})
// require('dotenv').config()
let client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
client.select((process.env.REDIS_INDEX), (x) => { return x });
module.exports=client