const express = require('express');

// controller functions
const { loginUser, signupUser, updateProfile, deleteProfile, getUsers, getUserById } = require('../controllers/userController');

const router = express.Router()

// get user by id
router.get('/get/:id', getUserById)

// get all users
router.get('/getAll', getUsers) 

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// update profile route
router.patch('/update', updateProfile)

// delete user profile route
router.delete('/delete', deleteProfile)


module.exports = router