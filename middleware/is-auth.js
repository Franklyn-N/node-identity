const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const autHeader = req.get('Authorization');
    if (!autHeader) {
        const error = new Error('Anthorization failed!');
        error.statusCode - 401;
        throw error;
    }
   const token = autHeader.split(' ')[1];
   let decodedToken;
   try {
    decodedToken = jwt.verify(token, 'thisismyveryownsecret');
   } catch (err) {
       err.statusCode = 401;
       throw err;
   }
   if(!decodedToken) {
     const error = new Error('Not authenticated.');
     error.statusCode = 401;
     throw error;
   }
   req.userId = decodedToken.userId;
   next();
};