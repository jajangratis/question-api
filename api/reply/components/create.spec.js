const db = require('../../../config/database')
const h = require('../../../helpers/helper')
const create = require('./create')

describe('Test Case Reply Question', () => {
    it('should return all master data', async () => {
        let AUTHOR = 'ujang'
        let CATEGORY = 'technology,social'
        let REPLY = 'lorem'
        let QUESTION_ID
        let post = await db('TR_QUESTION').whereRaw('"C_STATUS_ID" = 1').limit(1)

        if (h.checkNullQueryAll(post)) {
            QUESTION_ID = 2
        } else {
            QUESTION_ID = post[0].ID
        }
        let result = await create.createReply(AUTHOR, REPLY, QUESTION_ID)
        console.log({result});
        expect(result.status).toEqual(200)
    });
})