const moment = require('moment')

const db = require('../../../config/database')
const constants = require('../../../config/constants')
const h = require('../../../helpers/helper')

exports.createQuestion = async (AUTHOR, CATEGORY, QUESTION) => {
    if (h.checkNullQueryAllExtended([AUTHOR, QUESTION])) {
        return constants.invalidParameter()
    } else {
        if (!h.checkNullQueryAll(CATEGORY)) {
            CATEGORY = CATEGORY.split(',')
            CATEGORY = CATEGORY.map(x => x.replace(/[^0-9a-zA-Z]/,''))
            let categoryCheck = await db('MST_VALUE').whereRaw(`"C_VALUE_ID" = 'category' AND "C_STATUS_ID" = 1 AND "V_MASTER" IN (${CATEGORY.map(x => `'${x}'`).toString()})`)
            categoryCheck = categoryCheck.map(x => x.V_MASTER)
            CATEGORY = CATEGORY.filter(x => categoryCheck.includes(x))
        }
        await db.transaction(async trxAll => {
            try {
                let insertQuestion = await db('TR_QUESTION').insert({
                    V_AUTHOR_NAME:AUTHOR,
                    V_QUESTION:QUESTION,
                    C_STATUS_ID:1,
                    D_CREATED_DATE: moment().format('YYYY-MM-DD HH:mm:ss').toString()
                }).returning('ID').transacting(trxAll)
                if (!h.checkNullQueryAll(CATEGORY)) {
                    let catergoryArray = CATEGORY.map(x => {
                        return { 
                            C_QUESTION_ID:insertQuestion[0],
                            C_CATEGORY_ID:x,
                            C_STATUS_ID:1,
                            D_CREATED_DATE: moment().format('YYYY-MM-DD HH:mm:ss').toString()
                        }
        
                    })
                    let catergory = await db('TR_QUESTION_CATEGORY').insert(catergoryArray).transacting(trxAll)
                }
            } catch (error) {
                trxAll.rollback
            }
        })
        return constants.okSample()

    }
}