import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const registerUser = async (req, res) => {
    try{
        const {name,email,password} = req.body;

        if (!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const existingUser = await User.findOne({email});

        if(existingUser){
                return res.status(400).json({
                    success: true,
                    message: "email already registered try to login"
                })
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const createUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

    }
    catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


const loginUser = async () => {
    try{
        const {email,password} = req.body;

        if(!email ||!password){
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            })
        }

        const user = await findOne({email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: "invalid email or password"
            });
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if(!isPasswordValid){
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        )

        res.status(200).json({
            success: true,
            message: "login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }

        });

    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export {loginUser, registerUser}