const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if(!token){
    res.json({auth: false, message: "Invalid token"});
  }else{
    jwt.verify(token, process.env.JWTSTRING, (err, decoded) => {
      if(err){
        res.json({auth:false, message: "Failed to authenticate"});
      }else {
        req.userId = decoded.id;
        next();
      }
    })
  }
}

module.exports = verifyJWT