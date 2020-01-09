const express = require('express');

//* install and import express validator package installing using
const { check, validationResult } = require('express-validator');

//* import auth file from middleware package
const Token = require('../middleware/auth');


// import router
const router = express.Router();

//* import userController file from controller package
const UsersController = require('../controller/usersController');

const usersDetails = new UsersController();


const validateAllFields = () => [
  //* name valaidation
  check('name')
    .notEmpty().withMessage('Please enter your first Name')
    .isAlpha()
    .withMessage('Name must contain alphabets')
    .isLength({ min: 3 })
    .withMessage('Name must contain atleast 3 alphabets'),

 

  //* email validation
  check('email')
    .notEmpty().withMessage('Please enter your email')
    .isEmail()
    .withMessage('Please enter the valid Email'),


  //* password validation
  check('password')
    .notEmpty().withMessage('Required Password')
    .isLength({ min: 7 })
    .withMessage('Password should not be empty, minimum eigh characters, at least one letter, one number and one special character'),

];

//* post  form api router
// eslint-disable-next-line consistent-return
router.post('/SignUp', validateAllFields(), (req, res) => {
  const error = validationResult(req); //* field validation request

  if (!error.isEmpty()) {
    return res.status(400).json(error.array());
  }
  usersDetails.signUp(req, res);
});




//* update api router

//router.put('/:id', [checkToken, validateAllFields(), usersDetails.updateUser]);

//* delete api router
//router.delete('/:id', [checkToken, usersDetails.deleteUser]);

router.post('/login', [validateAllFields(), usersDetails.logIn]);
//* export router to another package

router.get('/details/me',usersDetails.userMe);


module.exports = router;
