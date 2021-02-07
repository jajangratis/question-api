const h = require('../../helpers/helper')
const config = require('../../config/keys')
const constant = require('../../config/constants')


// // DEV
// let key = h.genStringInt(32)
// let secret = h.genStringInt(32)
// // KEY : evPcbYxIOWjbpPtdo61IoWfEsuiD40Os
// // SECRET : ALfHeietxYTaAjFC2NbuY4aRaV3zOYFE
let secret = h.secEncrypt(config.masterKeySecure,'bzrKX@H!')
console.log(secret);
// console.log({
//     key,
//     secret
// });

// let test = constant.templateResponse(200,true,'ok','asda','asdas')
// let aaa = constant.invalidParameter()
// console.log(test,aaa);
