
const express = require('express');
const jobsRouter = express.Router();
const jobsController = require('../controllers/jobsController');

jobsRouter.post('/create', jobsController.create);
jobsRouter.get('/getalljobs', jobsController.getalljobs);
jobsRouter.put('/edit', jobsController.editjob);
jobsRouter.delete('/delete', jobsController.deletejob);

module.exports = jobsRouter;