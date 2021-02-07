const moment = require('moment')

const db = require('../../../config/database')
const constants = require('../../../config/constants')
const h = require('../../../helpers/helper')


exports.editQuestion = async (ID, AUTHOR, CATEGORY, QUESTION) => {
    if (h.checkNullQueryAllExtended([ID, AUTHOR, QUESTION])) {
        return constants.invalidParameter()
    }
    ID = ID.toString().replace(/[^0-9]/,'')
    if (!h.checkNullQueryAll(CATEGORY)) {
        CATEGORY = CATEGORY.split(',')
        CATEGORY = CATEGORY.map(x => x.replace(/[^0-9a-zA-Z]/,''))
        let categoryCheck = await db('MST_VALUE').whereRaw(`"C_VALUE_ID" = 'category' AND "C_STATUS_ID" = 1 AND "V_MASTER" IN (${CATEGORY.map(x => `'${x}'`).toString()})`)
        categoryCheck = categoryCheck.map(x => x.V_MASTER)
        CATEGORY = CATEGORY.filter(x => categoryCheck.includes(x))
    }
    await db.transaction(async trxAll => {
        try {
            await db('TR_QUESTION').where('ID', ID).update({
                V_AUTHOR_NAME:AUTHOR,
                V_QUESTION:QUESTION,
                D_CREATED_DATE: moment().format('YYYY-MM-DD HH:mm:ss').toString()
            }).transacting(trxAll)
            if (!h.checkNullQueryAll(CATEGORY)) {
                let catergoryArray = CATEGORY.map(x => {
                    return { 
                        C_QUESTION_ID:ID,
                        C_CATEGORY_ID:x,
                        C_STATUS_ID:1,
                        D_CREATED_DATE: moment().format('YYYY-MM-DD HH:mm:ss').toString()
                    }
    
                })
                await db('TR_QUESTION_CATEGORY').where('C_CATEGORY_ID', ID).update({
                    C_STATUS_ID:0,
                }).transacting(trxAll)
                await db('TR_QUESTION_CATEGORY').insert(catergoryArray).transacting(trxAll)
            }
        } catch (error) {
            console.log(error);
        }
        
    })
    return constants.okSample()
}