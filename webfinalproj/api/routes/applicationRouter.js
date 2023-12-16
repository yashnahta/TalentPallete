const express = require('express');
const applicationRouter = express.Router();
const applicationController = require('../controllers/applicationController');

applicationRouter.post('/apply', applicationController.apply);
applicationRouter.get('/getallapplied', applicationController.getallapplied);
applicationRouter.put('/editapp', applicationController.editapp);
applicationRouter.delete('/deleteapp', applicationController.deleteapp);

module.exports = applicationRouter;