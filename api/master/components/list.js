const db = require('../../../config/database')
const constants = require('../../../config/constants')
const h = require('../../../helpers/helper')

exports.listMaster = async(C_VALUE_ID) => {
    try {
        let data 
        if (h.checkNullQueryAll(C_VALUE_ID)) {
            data = await db('MST_VALUE')
        } else {
            data = await db('MST_VALUE').whereRaw(`"C_STATUS_ID" = 1 AND "C_VALUE_ID" = ?`,C_VALUE_ID)
        }
        return constants.okSample(data)
    } catch (error) {
        return constants.systemError(400, error)
    }
}