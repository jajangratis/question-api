const db = require('../../../config/database')
const h = require('../../../helpers/helper')

const edit = require('./edit')

describe('Test Case Edit Question', () => {
    it('should return all master data', async () => {
        let AUTHOR = 'dev'
        let CATEGORY = 'technology,social'
        let QUESTION = 'lorem edited'
        let ID = '3'
        let QUESTION_ID
        let REPLY_ID
        let post = await db('TR_QUESTION_REPLY').whereRaw('"C_STATUS_ID" = 1').limit(1)
        if (h.checkNullQueryAll(post)) {
            QUESTION_ID = 2
        } else {
            REPLY_ID = post[0].ID
            QUESTION_ID = post[0].C_QUESTION_ID
        }
        let result = await edit.editReply(REPLY_ID, 'dev', 'edited', QUESTION_ID)
        expect(result.status).toEqual(200)
    });
})