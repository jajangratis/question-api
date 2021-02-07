const list = require('./list')

describe('Test Case List Master', () => {
    it('should return all master data', async () => {
        let result = await list.listMaster()
        expect(result.status).toEqual(200)
    });
    it('should return all master data with filter by category', async () => {
        let result = await list.listMaster('category')
        expect(result.status).toEqual(200)
    });
})