const bcrypt = require('bcrypt')
const myModel = require('../models/user_model')
const signUp = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const isAlreadyExists = await myModel.findOne({ email })
        if (isAlreadyExists) {
            res.status(500).json({
                success: false,
                message: "please sign in"
            })
        }
        else {
            let hashPassword;
            try {
                hashPassword = await bcrypt.hash(password, 10);
            }
            catch (error) {
                res.status(500).json({
                    success: false,
                    message: "password hi nhi tha to encrypt kese hoga"
                })
            }
            // ab simple data jo hai create kardo db me
            const CreateData = await myModel.create({
                name, email, password: hashPassword, role
            })
            res.status(200).json({
                success: true,
                data: CreateData,
                message: "user signedUp"
            })
        }
    }
    catch (error) {
        console.error(error.message)
        res.status(500).json({
            success: false,
            data: "nhi milneka nikal yaha se paili fursat me nikal",
            message: "code error"
        })
    }
}

//handler for login

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //1) check karo ki credentials daale hai ya nhi
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "please fill your credentials"
            })
        }
        // 2) db me check karo ki user signedup hai ya nhi
        let user = await myModel.findOne({ email });  //ye db call hai
        if (!user) {
            return res.status(401).json({
                sucess: false,
                message: "please signup"
            })
        }
        //3) fir check karo password 

        
        if (await bcrypt.compare(password, user.password)) {
            //jwt token generate karo;
            const payload = {
            _id: user._id,
            email: user.email,
            password: user.password,
        }
            return res.status(200).json({
                success: true,
                token: token,
                userData: user
            })
        }
        else {
            return res.status(400).json({
                success: false,
                message: "password incorrect"
            })
        }
    }
    catch (error) {
        console.error(error)
        return res.status(500).json({
            success: false,
            message: 'login failure'
        })
    }
}

module.exports = { signUp, login }