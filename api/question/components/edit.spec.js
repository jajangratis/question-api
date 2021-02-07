const edit = require('./edit')

describe('Test Case Edit Question', () => {
    it('should return all master data', async () => {
        let AUTHOR = 'dev'
        let CATEGORY = 'technology,social'
        let QUESTION = 'lorem edited'
        let ID = '3'
        let result = await edit.editQuestion(ID, AUTHOR, CATEGORY, QUESTION)
        expect(result.status).toEqual(200)
    });
})