const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')

dotenv.config()

const generateToken=(userId,email,role='user')=>{

    const payload={email,userId,role}
    
    const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:'30m'})
    
    return token

}

module.exports={generateToken}
