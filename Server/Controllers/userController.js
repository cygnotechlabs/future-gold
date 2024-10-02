const JWT = require('jsonwebtoken')


const { hashPassword, comparePassword } = require('../Helpers/authHelper');
const userModel = require('../Models/userModel');

//REGISTRATION
const registerController = async (req, res) => {

    try {
        const { name, email, password } = req.body

        //VALIDATION
        if (!name) {
            return res.status(400).send({
                success: false,
                message: 'Name is required',
            });
        }

        if (!email) {
            return res.status(400).send({
                success: false,
                message: 'Email is required',
            });
        }

        if (!password || password.length < 6) {
            return res.status(400).send({
                success: false,
                message: 'Password is required and must be at least 6 characters long',
            });
        }

        //EXISITING USER
        const exisitingUser = await userModel.findOne({ email })
        if (exisitingUser) {
            return res.status(500).send({
                success: false,
                message: 'User Already Register with email',
            });
        }

        //HASHED PASSWORD
        const hashedPassword = await hashPassword(password);

        //SAVE USER
        const user = await userModel({ name, email, password: hashedPassword }).save()

        return res.status(201).send({
            success: true,
            message: 'Registeration Successfull please Login',
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in REgistration API",
            error,
        });

    }

};

//LOGIN
const loginController = async (req, res) => {

    try {
        const { email, password } = req.body
        //VALIDATION
        if (!email || !password) {
            return res.status(500).send({
                success: false,
                message: 'please provide Email or Password',
            })
        }

        //FIND USER
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(500).send({
                success: false,
                message: 'User not found'
            })
        }

        //MATCH PASSWORD
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(500).send({
                success: false,
                message: 'Invalid username or password'
            })
        }

//TOCKEN JWT
const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET,{
    expiresIn:"10d",
})


        // //UNDEFAINED PASSWORD
        // user.password = undefined;  if it need time then use only not importantt, it wahes password input in postman

        res.status(200).send({
            success: true,
            message: 'Login successfully',
            user,
            token,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: 'error in Login api',
            error,
        })
    }

};

module.exports = { registerController, loginController };