const list = require('./list')

describe('Test Case List Master', () => {
    it('should return all data', async () => {
        let result = await list.getQuestionList()
        expect(result.status).toEqual(200)
    });
    it('should return 10 data', async () => {
        let result = await list.getQuestionList(10, 0, undefined, 'desc')
        expect(result.status).toEqual(200)
    });
})