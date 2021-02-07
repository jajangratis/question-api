const moment = require('moment')

const db = require('../../../config/database')
const constants = require('../../../config/constants')
const h = require('../../../helpers/helper')

exports.getQuestionList = async (LIMIT, OFFSET, ID, ORDER, C_QUESTION_ID) => {
    if (h.checkNullQueryAllExtended([C_QUESTION_ID])) {
        return constants.invalidParameter()
    }
    if (!h.checkNullQueryAll(LIMIT)) {
        LIMIT = LIMIT.toString().replace(/[^0-9]/gmi,'')
    } 
    if (!h.checkNullQueryAll(OFFSET)) {
        OFFSET = OFFSET.toString().replace(/[^0-9]/gmi,'')
    } 
    if (!h.checkNullQueryAll(ID)) {
        ID = ID.toString().replace(/[^0-9]/gmi,'')
    } 
    if (!h.checkNullQueryAll(C_QUESTION_ID)) {
        C_QUESTION_ID = C_QUESTION_ID.toString().replace(/[^0-9]/gmi,'')
    } 
    if (!h.checkNullQueryAll(ORDER)) {
        if (!['desc','DESC','asc','ASC'].includes(ORDER)) {
            ORDER = 'desc'
        }
    } else {
        ORDER = 'desc'
    }
    let replies 
    if (h.checkNullQueryAll(ID)) {
        replies = await db('TR_QUESTION_REPLY').whereRaw(`"C_STATUS_ID" = 1 ${!h.checkNullQueryAll(OFFSET)?`AND "ID" ${ORDER == 'desc' || ORDER == 'DESC' ? '<' : '>'} ${OFFSET}`:''} AND "C_QUESTION_ID" = ?`,[C_QUESTION_ID])
    } else {
        replies = await db('TR_QUESTION_REPLY').whereRaw(`"C_STATUS_ID" = 1 ${!h.checkNullQueryAll(OFFSET)?`AND "ID" ${ORDER == 'desc' || ORDER == 'DESC' ? '<' : '>'} ${OFFSET}`:''} AND "ID" = ? AND "C_QUESTION_ID" = ?`,[ID, C_QUESTION_ID])
    }
    return constants.okSample(replies)
    
}