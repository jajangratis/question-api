
const crypto = require("crypto");
const base64 = require('base-64');
const moment = require('moment')
const axios = require('axios').default

const constant = require('../config/keys')
const db = require('../config/database');
const config = require('../config/keys')


exports.randomIntFromInterval = (min,max)=>{
    return Math.floor(Math.random()*(max-min+1)+min);
}


exports.genStringInt = (length) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
}

exports.uniq = (a) => {
    return Array.from(new Set(a));
}

exports.checkNullQuery = (object) => {
    if (object[0] == undefined || object[0].length == 0) {
        return true;
    };
    return false;
}

exports.checkNullQueryAll = (object) => {
    if (object == undefined || object == '' || (Array.isArray(object)&& object.length == 0) ) {
        return true;
    };
    return false;
}

exports.checkNullQueryAllExtended = (object,rule) => {
    if (!Array.isArray(object)) {
        return this.checkNullQueryAll(object)
    }else{
        if (this.checkNullQueryAll(object)) {
            return true
        }else{
            let result = []
            for (let index = 0; index < object.length; index++) {
                const obj = object[index];
                if (this.checkNullQueryAll(obj)) {
                    result.push('true')
                }else{
                    result.push('false')
                }
                if (index + 1 == object.length) {
                    if (rule == "AND" || rule == "&&" || rule == "and" || rule == "And") {
                        let counter = 0
                        for (let index = 0; index < result.length; index++) {
                            const rs = result[index];
                            if (rs == 'true') {
                                counter = counter + 1
                            }
                            if (index + 1 == result.length) {
                                if (counter == result.length) {
                                    return true
                                }else{
                                    return false
                                }
                            }
                        }
                    }else{
                        if(result.includes('true')){
                            return true
                        }else{
                            return false
                        }
                    }
                }
            }
        }
    }
}

exports.isEmailT = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

exports.isPhoneT = (phone) => {
    var re = /^\d{10,14}$/;
    return re.test(String(phone));
}


