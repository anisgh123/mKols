const Task = require("../models/Task");

exports.createTask = async (req, res) => {
    const { description,title ,deadline, status="pending" } = req.body;
    const userId = req.userId; 
  
    try {
      const newTask = new Task({
        userId,
        description,
       title ,
       deadline, 
         status
          });
  
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };


  exports.getTasksByUserId = async (req, res) => {
    try {
      
      const userId = req.userId; 
      const tasks = await Task.find({ userId: userId });
      res.status(200).json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };

  exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    console.log(req)
  
    try {
      const deletedTask = await Task.findByIdAndDelete(id);
  
      if (!deletedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong' });
    }
  };
  