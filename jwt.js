const jwt=require('jsonwebtoken');

const jwtAuthMiddleware=(req,res,next)=>{
    
   // first check request headers has authorization or not
   const authorization=req.headers.authorization;
   if(!authorization) return res.status(401).json({error:'invalid token not found'});

    //Extract the jwt token from the request headers
    const token=req.headers.authorization.split(' ')[1];
    if(!token) return res.status(401).json({error:"Unauthorized"});

    try {
       //verify the jwt token
       const decoded=jwt.verify(token,process.env.JWT_SECRET);
       //Attach user information to the request object
       req.user=decoded;
       next();
    } catch (error) {
      console.error(error);
      res.status(401).json({error:'invalid token'})
    }
}

// Function to generate jwt token
const generateToken=(userData)=>{
  // Generate a new jwt token using user data
  return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:3000});
}


module.exports={jwtAuthMiddleware,generateToken};