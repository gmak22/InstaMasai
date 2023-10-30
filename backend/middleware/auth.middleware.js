const jwt = require("jsonwebtoken")
const { blacklist } = require("../blacklist")

const auth = (req,res,next) => {
    const token = req.headers.authorization?.split(" ")[1]

    if(blacklist.includes(token)){
        res.status(400).send({err: "Login Again"})
    }
    else{
        jwt.verify(token, 'masai', (err, decoded)=>{
            if(decoded){
                req.body.name = decoded.name
                req.body.userID = decoded.userID
                next()
            }
            else{
                res.status(400).send({err: "Unauthorized"})
            }
        })
    }
}

module.exports = { auth }