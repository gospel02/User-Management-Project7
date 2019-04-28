const express = require('express');

var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');

router.get('/', (req, res) =>{
    res.render('user/addOrEdit',{
        viewTitle : "Add User"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
    addUser(req, res);
    else
    updateUser(req, res);
});

function addUser(req, res){
    var user = new User();
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.age = req.body.age;
    user.save((err, doc) =>{
        if(!err)
        res.redirect('user/list');
        else{
            console.log('Error during record insertion : ' + err);
        }
    });

}

function updateUser(req, res) {
    User.findOneAndUpdate({_id: req.body._id} , req.body, { new: true }, (err, doc) => {
        if(!err) { res.redirect('user/list'); }
        else{
            console.log('Error during record update : ' + err);
        }

    });

}

router.get('/list', (req, res) => {
    User.find((err, docs) => {
        if (!err) {
            res.render("user/list", {
                list: docs
            })
        }
        else {
            console.log('Error in retrieving user list : ' + err);
        }
    });
});

router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, doc) =>{
        if(!err) {
            res.render("user/addOrEdit", {
                viewTitle: "Update User",
                user: doc

            });
        }
    });

});

router.get('/delete/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/user/list');
        }
        else {console.log('Error in user delete : ' + err); }
    });
});


module.exports = router;