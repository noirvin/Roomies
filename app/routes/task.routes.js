module.exports = (app, passport) => {
    const tasks = require('../controllers/task.controller.js');
    const Comment = require('../models/comment');
    const Task = require('../models/task.model');
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

    //authroutes for passport

    app.get('/login',(req, res) => {

        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    app.get('/signup', (req, res)=> {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/signup',
        failureFlash : true
    }));

    app.get('/logout', (req, res)=> {
        req.logout();
        res.redirect('/');
    });

    function isLoggedIn(req, res, next) {


        if (req.isAuthenticated())
        return next();

        res.redirect('/');
    }
    //comment routes
    app.post("/tasks/update/:taskId/comments", function(req, res) {
        // INSTANTIATE INSTANCE OF MODEL
        const comment = new Comment(req.body);

        // SAVE INSTANCE OF Comment MODEL TO DB
        comment
        .save()
        .then(comment => {
            // REDIRECT TO THE ROOT
            return Task.findById(req.params.taskId);
        })
        .then(task =>{
            task.comments.unshift(comment);
            return task.save();
        })
        .then(task =>{
            res.redirect('/')
        })
        .catch(err => {
            console.log(err);
        });
});



}
