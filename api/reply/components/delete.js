const moment = require('moment')

const db = require('../../../config/database')
const constants = require('../../../config/constants')
const h = require('../../../helpers/helper')

exports.deleteQuestion = async (ID) => {
    if (h.checkNullQueryAll(ID)) {
        return constants.invalidParameter()
    }
    ID = ID.toString().replace(/[^0-9]/,'')
    try {
        await db('TR_QUESTION_REPLY').where('ID', ID).update({
            C_STATUS_ID: 0
        })
        return constants.okSample()
    } catch (error) {
        return constants.systemError(400, error)
    }
}