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
router.post('/login', async (req, res, next) => {
    const { username, password } = req.body
    try {
        if (!username || password) {
            return res.render('auth/login', {
                errorMessage: 'Please fill out all of the fields',
            })
        }
        const foundUser = await User.findOne(
            { username },
            { password: 1, username: 1 }
        )
        if (!foundUser) {
            return res.render('auth/login', {
                errorMessage: 'Please sign up first'
            })
        }
        const matchingPassword = await bcrypt.compare(password, foundUser.password)
        if (!matchingPassword) {
            return res.render('auth/login', {
                errorMessage: 'invalid username or password'
            })
        }
        req.session.currentUser = foundUser
        res.redirect('/profile')
    } catch (err) {
        next(err)
    }
})


// LISTEN FOR A POST FORM ON THE 'SIGN UP' ROUTE
router.post('/signup', async (req, res, next) => {
    const { password, username } = req.body
    try {
        if (!username || !password) {
            return res.render('auth/signup', {
                errorMessage: "Please fill out all of the fields!",
            })
        }
        if (password.lenght < 4) {
            return res.render('auth/signup', {
                errorMessage: "Please put a longer pasword",
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const userToCreate = {
            username,
            password: hashedPassword,
        }
        const userFromDb = await User.create(userToCreate);
        res.redirect('/login')
    } catch (err) {
        next(err)
    }
})




module.exports = router;