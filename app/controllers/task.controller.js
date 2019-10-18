const Task = require('../models/task.model.js');

exports.newTask = (req, res) => {
    res.render("./tasks/create")
};

// return all the tasks
exports.showAll = (req, res) => {
    Task.find()
    .then(tasks => {
        res.render("./tasks/index", {tasks: tasks});
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occured while getting tasks from database."
        });
    });
};

exports.editTask = (req, res) => {
    Task.findById(req.params.taskId)
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "task not found id: " + req.params.taskId
            });
        }
        // res.send(task);
        res.render('./tasks/edit', { task: task})
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "task not found id: " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "error retrieving note with id " + req.params.taskId
        });
    });
};

// make and store a new task
exports.create = (req, res) => {
    // validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "task can't be empty"
        });
    }

    //add a task
    const task = new Task({
        title: req.body.title || "Untitled task",
        content: req.body.content
    });

    // store task in the database
    task.save()
    .then(data => {
        res.redirect("/");
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error occured while storing the task."
        });
    });

};

// find a single task
exports.findOne = (req, res) => {
    Task.findById(req.params.taskId)
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "task not found id: " + req.params.taskId
            });
        }
        // res.send(task);
        res.render('./tasks/show', {task: task})
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "task not found id: " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "error retrieving note with id " + req.params.taskId
        });
    });

};

// edit a task
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "task can't be empty"
        });
    }

    // Find note and update it with the request body
    Task.findByIdAndUpdate(req.params.taskId, {
        title: req.body.title || "Untitled Task",
        content: req.body.content
    }, {new: true})
    .then(task => {
        if(!task) {
            return res.status(404).send({
                message: "task not found id: " + req.params.taskId
            });
        }
        res.redirect('/task/' + req.params.taskId);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "task not found id: " + req.params.taskId
            });
        }
        return res.status(500).send({
            message: "error while saving changes " + req.params.taskId
        });
    });

};

// remove a task
exports.delete = (req, res) => {
    Task.findByIdAndRemove(req.params.taskId)
   .then(task => {
       if(!task) {
           return res.status(404).send({
               message: "task not found id: " + req.params.taskId
           });
       }
       res.redirect('/');
   }).catch(err => {
       if(err.kind === 'ObjectId' || err.name === 'NotFound') {
           return res.status(404).send({
               message: "task not found id:  " + req.params.taskId
           });
       }
       return res.status(500).send({
           message: "can't delete task id:  " + req.params.noteId
       });
   });
};
