const jwt = require('jsonwebtoken');

const authenticate = async (req,res,next)=>{
        if(!req.get('token'))
            return res.status(401).send('Un authenticated');
        const token = req.get('token');
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                console.error('JWT verification failed:', err.message);
                return next('Un authenticated request');
            }
            req.user = {
              "id" : decoded.id
            }
            next();
        });

}


module.exports = authenticate;