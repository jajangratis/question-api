const express = require('express');
const jwt = require('jsonwebtoken');
// const formidableMiddleware = require('express-formidable');
const path = require('path');
const base64 = require('base-64')

const db = require('../config/database');
const config = require('../config/keys');
const h = require('../helpers/helper')

let router = express.Router();

/**
 * Controller
 */
const masterController = require('../api/master/masterController')
const questionController = require('../api/question/questionController')
const replyController = require('../api/reply/replyController')

// MASTER
router.get('/master/list', masterController.getListMaster)

// QUESTION
router.get('/question/list', questionController.getListQuestion)
router.post('/question/add', questionController.postQuestion)
router.post('/question/edit', questionController.postQuestionEdit)
router.post('/question/delete', questionController.postQuestionDelete)

// REPLY
router.get('/reply/list', replyController.getListReply)
router.post('/reply/add', replyController.postReply)
router.post('/reply/edit', replyController.postQuestionEdit)
router.post('/reply/delete', replyController.postReplyDelete)

module.exports = router;