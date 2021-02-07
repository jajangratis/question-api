const deleteTest = require('./delete')

describe('Test Case delete', () => {
    it('should return all data', async () => {
        let result = await deleteTest.deleteQuestion(1)
        expect(result.status).toEqual(200)
    })
})