const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')


// CREATE ROUTE FOR LOGIN     GET
router.get('/login', (req, res, next) => {
    try {
        res.render('auth/login')
    } catch (err) {
        next(err)
    }
})

// CREATE ROUTE FOR SIGN UP    GET
router.get('/signup', (req, res, next) => {
    try {
        res.render('auth/signup')
    } catch (err) {
        next(err)
    }
})

// LISTEN FOR A POST FORM ON THE 'LOGIN' ROUTE



// LISTEN FOR A POST FORM ON THE 'SIGN UP' ROUTE


module.exports = router;