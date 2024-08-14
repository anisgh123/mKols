const express = require('express');

const { createTask,getTasksByUserId, deleteTask} = require('../controllers/TaskController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();


router.post('/task',authMiddleware,createTask )
router.get('/task',authMiddleware,getTasksByUserId )
router.delete('/task/:id',deleteTask )


module.exports = router;
