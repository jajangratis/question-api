const moment = require('moment')

const db = require('../../../config/database')
const constants = require('../../../config/constants')
const h = require('../../../helpers/helper')

exports.getQuestionList = async (LIMIT, OFFSET, ID, ORDER, SEARCH) => {
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
        if (!h.checkNullQueryAll(SEARCH)) {
            questionList = await db('TR_QUESTION').whereRaw(`"C_STATUS_ID" = 1 ${!h.checkNullQueryAll(OFFSET)?`AND "ID" ${ORDER == 'desc' || ORDER == 'DESC' ? '<' : '>'} ${OFFSET}`:''} AND ("V_AUTHOR_NAME" ilike ? OR "V_QUESTION" ilike ? )`,[`%${SEARCH}%`, `%${SEARCH}%`])
        } else {
            questionList = await db('TR_QUESTION').whereRaw(`"C_STATUS_ID" = 1 ${!h.checkNullQueryAll(OFFSET)?`AND "ID" ${ORDER == 'desc' || ORDER == 'DESC' ? '<' : '>'} ${OFFSET}`:''}`)
        }
    } else {
        questionList = await db('TR_QUESTION').whereRaw(`"C_STATUS_ID" = 1 ${!h.checkNullQueryAll(OFFSET)?`AND "ID" ${ORDER == 'desc' || ORDER == 'DESC' ? '<' : '>'} ${OFFSET}`:''} AND "ID" = ? ${!h.checkNullQueryAll(SEARCH)?`AND ("V_AUTHOR_NAME" ilike ? OR "V_QUESTION" ilike ? )`:''}`,!h.checkNullQueryAll(SEARCH)?[ID, `%${SEARCH}%`, `%${SEARCH}%`]:[ID])
    }
    // TODO : join dengan catgegorynya
    if (!h.checkNullQueryAll(questionList)) {
        let ids = questionList.map(x => x.ID)
        // let categories = await db.distinct('*').from('TR_QUESTION_CATEGORY').whereRaw(`"C_STATUS_ID" = 1 AND "C_QUESTION_ID" in (${ids.map(x => `'${x}'`)})`)
        let categories = await db.raw(`SELECT DISTINCT("C_CATEGORY_ID") AS "C_CATEGORY_ID", "C_QUESTION_ID" FROM "TR_QUESTION_CATEGORY" WHERE "C_STATUS_ID" = 1 AND "C_QUESTION_ID" in (${ids.map(x => `'${x}'`)})`)
        categories = categories.rows
        let commentCount = await db.select('C_QUESTION_ID').from('TR_QUESTION_REPLY').whereRaw(`"C_STATUS_ID" = 1`).groupBy('C_QUESTION_ID').count('ID as TOTAL')
        questionList = questionList.map(x => {
            let V_REPLY_COUNT = commentCount.filter(y => y.C_QUESTION_ID == x.ID).map(x => x.TOTAL)
            if (h.checkNullQueryAll(V_REPLY_COUNT)) {
                V_REPLY_COUNT = '0'
            } else {
                V_REPLY_COUNT = V_REPLY_COUNT[0]
            }
            return {...x, C_CATEGORY_ID: categories.filter(y => y.C_QUESTION_ID == x.ID).map(x => x.C_CATEGORY_ID), V_REPLY_COUNT}
        })
    }

    return constants.okSample(questionList)
    
}