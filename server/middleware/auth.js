const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  //read token header
  const token = req.header('x-auth-token');
  //Check token
  if (!token) 
    return res.status(401).json({msg: 'Not Token, invalid permission'});
  
  //validated token
  try {
    const encryp = jwt.verify(token, process.env.SECRET);
    req.user = encryp.user;
    next();
  } catch (e) {
    res.status(401).json({msg: 'Token no valido'});
  }
}

