const list = require('./list')

describe('Test Case List Master', () => {
    it('should return all data', async () => {
        let LIMIT = 1
        let OFFSET = 0
        let ID = undefined
        let ORDER = 'desc'
        let C_QUESTION_ID = '3'
        let result = await list.getQuestionList(LIMIT, OFFSET, ID, ORDER, C_QUESTION_ID)
        expect(result.status).toEqual(200)
    });
})