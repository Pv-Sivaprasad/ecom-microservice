const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/generateToken');

const registerUser = async (req, res) => {

    const { name, email, password } = req.body;
 
    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(404).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.status(200).json(user);  // Fix the typo in res.stauts -> res.status
    } catch (error) {
        console.log('Error in registering user', error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
              
                const token=generateToken(user._id,user.email)
                res.setHeader("Authorisation1", `Bearer ${token}`);
                res.status(201).json({ token });
            } else {
                res.status(400).json({ message: 'Invalid email/password' });
            }
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.log('Error in user login', error);
        res.status(500).json({ message: 'Error during login' });
    }
};

module.exports = { registerUser, userLogin };  
