const list = require('./components/list')
const create = require('./components/create')
const deleteTask = require('./components/delete')
const edit = require('./components/edit')

exports.getListQuestion = async (req, res) => {
    let LIMIT = req.query.LIMIT
    let OFFSET = req.query.OFFSET
    let ID = req.query.ID
    let ORDER = req.query.ORDER
    let SEARCH = req.query.SEARCH
    let CATEGORY = req.query.CATEGORY
    let result = await list.getQuestionList(LIMIT, OFFSET, ID, ORDER, SEARCH, CATEGORY)
    return res.status(result.status).json(result); 
}

exports.postQuestion = async (req, res) => {
    let AUTHOR = req.body.AUTHOR
    let CATEGORY = req.body.CATEGORY
    let QUESTION = req.body.QUESTION
    let result = await create.createQuestion(AUTHOR, CATEGORY, QUESTION)
    return res.status(result.status).json(result); 
}

exports.postQuestionEdit = async (req, res) => {
    let AUTHOR = req.body.AUTHOR
    let CATEGORY = req.body.CATEGORY
    let QUESTION = req.body.QUESTION
    let ID = req.body.ID
    let result = await edit.editQuestion(ID,AUTHOR, CATEGORY, QUESTION)
    return res.status(result.status).json(result); 
}

exports.postQuestionDelete = async (req, res) => {
    let ID = req.body.ID
    let result = await deleteTask.deleteQuestion(ID)
    return res.status(result.status).json(result); 
}