const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config({ path: '../../env' })

const isAuthenticated = async (req, res, next) => {

    console.log('Authentication starts here');

    const authHeader = req.headers["authorization"]
console.log('auhtfaskdjh"}{{',authHeader);

    if (!authHeader) return res.status(401).json({ message: ' authorization missing in the headers ' })

    const token = authHeader.split(" ")[1]

    if (!token) return res.status(401).json({ message: 'Token is not avilable in the header' })

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if (err) return res.status(403).json({ message: "Invalid or expired tokem" })
        req.user = user

        next()

    })


}

module.exports = isAuthenticated