import jwt from "jsonwebtoken";
//Authorization check - Checks for access token of the user to perform operations. 
//This will be executed after req receival and before sending response
const checkTokenHeader = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader || authHeader.split(' ')[1]
    if (token == null) return res.status(401).json({message:"Not Authorized!!"})
    jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user)=>{
      if(error){
          return res.status(401).json({ success: false, message: "Invalid token" })
      }
      req.user = user
      next();
    });
};

export default checkTokenHeader;
