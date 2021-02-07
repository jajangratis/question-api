const list = require('./components/list')

exports.getListMaster = async (req, res) => {
    let C_VALUE_ID = req.query.C_VALUE_ID
    let result = await list.listMaster(C_VALUE_ID)
    return res.status(result.status).json(result); 
}