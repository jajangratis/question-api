const moment = require('moment')

const db = require('../../../config/database')
const constants = require('../../../config/constants')
const h = require('../../../helpers/helper')

exports.createReply = async (AUTHOR, V_REPLY, C_QUESTION_ID) => {
    if (h.checkNullQueryAllExtended([AUTHOR, V_REPLY, C_QUESTION_ID])) {
        return constants.invalidParameter()
    } else {
        try {
            let check = await db('TR_QUESTION').whereRaw('"C_STATUS_ID" = 1 and "ID" = ?',[C_QUESTION_ID])
            if (h.checkNullQueryAll(check)) {
                return constants.templateResponse(400, false, 'question_not_found')
            } else {
                let insertReply = await db('TR_QUESTION_REPLY').insert({
                    C_QUESTION_ID,
                    V_REPLY,
                    C_STATUS_ID:1,
                    V_AUTHOR_NAME:AUTHOR,
                    D_CREATED_DATE: moment().format('YYYY-MM-DD HH:mm:ss').toString()
                }).returning('ID')
            }
            return constants.okSample()
        } catch (error) {
            return constants.systemError(400, error)
        }
    }
}