const create = require('./create')

describe('Test Case Create Question', () => {
    it('should return all master data', async () => {
        let AUTHOR = 'dev'
        let CATEGORY = 'technology,social'
        let QUESTION = 'lorem'
        let result = await create.createQuestion(AUTHOR, CATEGORY, QUESTION)
        expect(result.status).toEqual(200)
    });
})