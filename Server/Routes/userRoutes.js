const express = require('express');
const { registerController, loginController } = require('../Controllers/userController');


//router object
const router = express.Router();

//Routes

//REGISTER || POST
router.post("/register", registerController );

// //LOGIN || POST
router.post("/login", loginController );

//export
module.exports = router;