const jwt = require('jsonwebtoken');
const JWT_SECRET = 'prakashisunstoppable';



fetchuser = (req, res, next) => {
    //get the user from Jwt token and add id to request object.

    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "please authenticate using a valid token " });
    }
    
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    }

    catch (error) {
        return res.send(401).send({ error: "please authenticate using valid credentials" });
    }
}


module.exports = fetchuser;