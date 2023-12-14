// Middleware for requests who require to be posts creator

const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];
       const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
       if (decodedToken.role == 'admin'||decodedToken.role == 'staff'||decodedToken.role == 'creator') {
           req.auth = {
               userId: decodedToken.userId,
               role: decodedToken.role,
           };
       } else {
        return res.status(400).json({ message : 'Permission créateur requise.' });
       }
	next();
   } catch(error) {
       res.status(500).json({ message : 'Erreur serveur (voir logs).' });
       console.log(error)
   }
};

// Temp