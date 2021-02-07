const moment = require('moment')

const db = require('../../../config/database')
const constants = require('../../../config/constants')
const h = require('../../../helpers/helper')

exports.getQuestionList = async (LIMIT, OFFSET, ID, ORDER) => {
    if (!h.checkNullQueryAll(LIMIT)) {
        LIMIT = LIMIT.toString().replace(/[^0-9]/gmi,'')
    } 
    if (!h.checkNullQueryAll(OFFSET)) {
        OFFSET = OFFSET.toString().replace(/[^0-9]/gmi,'')
    } 
    if (!h.checkNullQueryAll(ID)) {
        ID = ID.toString().replace(/[^0-9]/gmi,'')
    } 
    if (!h.checkNullQueryAll(ORDER)) {
        if (!['desc','DESC','asc','ASC'].includes(ORDER)) {
            ORDER = 'desc'
        }
    } else {
        ORDER = 'desc'
    }
    let questionList 
    if (h.checkNullQueryAll(ID)) {
        questionList = await db('TR_QUESTION').whereRaw(`"C_STATUS_ID" = 1 ${!h.checkNullQueryAll(OFFSET)?`AND "ID" ${ORDER == 'desc' || ORDER == 'DESC' ? '<' : '>'} ${OFFSET}`:''}`)
    } else {
        questionList = await db('TR_QUESTION').whereRaw(`"C_STATUS_ID" = 1 ${!h.checkNullQueryAll(OFFSET)?`AND "ID" ${ORDER == 'desc' || ORDER == 'DESC' ? '<' : '>'} ${OFFSET}`:''} AND "ID" = ?`,[ID])
    }
    // TODO : join dengan catgegorynya
    let ids = questionList.map(x => x.ID)
    let categories = await db('TR_QUESTION_CATEGORY').whereRaw(`"C_STATUS_ID" = 1 AND "C_QUESTION_ID" in (${ids.map(x => `'${x}'`)})`)
    let commentCount = await db.select('C_QUESTION_ID').from('TR_QUESTION_REPLY').whereRaw(`"C_STATUS_ID" = 1`).groupBy('C_QUESTION_ID').count('ID as TOTAL')
    questionList = questionList.map(x => {
        return {...x, C_CATEGORY_ID: categories.filter(y => y.C_QUESTION_ID == x.ID).map(x => x.C_CATEGORY_ID), V_REPLY_COUNT: commentCount.filter(y => y.C_QUESTION_ID == x.ID).map(x => x.TOTAL)}
    })

    return constants.okSample(questionList)
    
}