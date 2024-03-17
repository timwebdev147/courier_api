const { StatusCodes } = require("http-status-codes");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


const signUp = async (req, res) => {
const {userName, c_password, password} = req.body;
if (c_password !== password) {
    return res.status(401).json({message: "password and confirm password don't match"})
    
}

const hash_password = await bcrypt.hash(password, 10);

const userData = {
    userName, hash_password
}



// check the database for an existing email
const user = await User.findOne({userName})

//if the username exists return error with message
if(user){
    return res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already registered",
    });
} 
//if the username doesn't exist register the user 
else{
    
    User.create(userData).then((response, err) => {
        if (err) {
            
            return res.status(StatusCodes.BAD_REQUEST).json({err});
        } else{
            
            const token = jwt.sign(
                { _id: response._id},
                process.env.JWT_SECRET,{ expiresIn: "30d"}
                );
                
            req.token = token;
            return res.status(StatusCodes.ACCEPTED).json({token, response})

        }
    })
}

}
const signIn = async (req, res) => {
    try {
       if (!req.body.userName || !req.body.password) {
          return res.status(StatusCodes.BAD_REQUEST).json({
             message: "Please enter user and password",
          });
       }
   
       const user = await User.findOne({ username: req.body.username });
      
       if (user) {
        let result = await user.authenticate(req.body.password)
        
       if (result) {
             const token = jwt.sign(
                { _id: user._id},
                process.env.JWT_SECRET,{ expiresIn: "7d"}
                );
    const { _id, userName} = user;
    
    req.token = token;
    res.status(StatusCodes.OK).json({
         token,
         user: { _id, userName},
    });
   } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
       message: "username and password don't match",
    });
   }
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({
        message: "User does not exist..!",
    });
  }
  } catch (error) {
     res.status(StatusCodes.BAD_REQUEST).json({ error });
    }
};




module.exports = {signUp, signIn}