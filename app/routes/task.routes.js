module.exports = (app, passport) => {
    const tasks = require('../controllers/task.controller.js');

    // views
    app.get('/', tasks.showAll);
    app.get('/task/create', tasks.newTask);
    // show a single task
    app.get('/task/:taskId', tasks.findOne);
    app.get('/task/:taskId/edit', tasks.editTask);

    // Add a new task
    app.post('/tasks', tasks.create);

    // edit/update a task
    app.post('/tasks/update/:taskId', tasks.update);

    // remove a task
    app.post('/tasks/delete/:taskId', tasks.delete);

    //authroutes

    app.get('/login',(req, res) => {

        res.render('login.ejs', { message: req.flash('loginMessage') });
    });



}
