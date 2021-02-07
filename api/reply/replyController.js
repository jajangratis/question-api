const list = require('./components/list')
const create = require('./components/create')
const deleteTask = require('./components/delete')
const edit = require('./components/edit')


exports.getListReply = async (req, res) => {
    let LIMIT = req.query.LIMIT
    let OFFSET = req.query.OFFSET
    let ID = req.query.ID
    let ORDER = req.query.ORDER
    let C_QUESTION_ID = req.query.C_QUESTION_ID
    let result = await list.getQuestionList(LIMIT, OFFSET, ID, ORDER, C_QUESTION_ID)
    return res.status(result.status).json(result); 
}

exports.postReply = async (req, res) => {
    let AUTHOR = req.body.AUTHOR
    let V_REPLY = req.body.V_REPLY
    let C_QUESTION_ID = req.body.C_QUESTION_ID
    let result = await create.createReply(AUTHOR, V_REPLY, C_QUESTION_ID)
    return res.status(result.status).json(result); 
}

exports.postQuestionEdit = async (req, res) => {
    let AUTHOR = req.body.AUTHOR
    let V_REPLY = req.body.V_REPLY
    let C_QUESTION_ID = req.body.C_QUESTION_ID
    let ID = req.body.ID
    let result = await edit.editReply(ID, AUTHOR, V_REPLY, C_QUESTION_ID)
    return res.status(result.status).json(result); 
}

exports.postReplyDelete = async (req, res) => {
    let ID = req.body.ID
    let result = await deleteTask.deleteQuestion(ID)
    return res.status(result.status).json(result); 
}