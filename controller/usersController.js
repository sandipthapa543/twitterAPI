const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const users = require ('../model/userModel');
const config = require('../config');



class Users{


    signUp(req,res){
    const userData = {
       name:req.body.name,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password),


    }
    users.create(userData, (error, result) => {
      if (error) {
        res.status(400).json('cannot find');
      } if (result) {
        res.status(201).json('successful signup');
      }
    });
  }

    logIn(req,res){
        const logData={
            email:req.body.email,
            password:req.body.password
        }
        users.findOne({email : logData.email}).exec((error,result)=> {
            if (result) {
                bcrypt.compare(logData.password, result.password, (err, results) => {
                    if (results) {
                        const token = jwt.sign({ data: result }, config.secret, { expiresIn: '24h' });
            res.status(200).json({
              token,
            });
          } else {
            res.status(400).json({
              sucess: false,
              message: 'Invalid Password.',
            });
          }
        });
      }
    });

}

userMe(req,res){
  let token = req.headers['x-access-token'] || req.headers.authorization;

  if (token) {
    if (token.startsWith('Bearer')) {
      token = token.slice(7, token.length);
    }
    // eslint-disable-next-line consistent-return
    jwt.verify(token, config.secret, (erorr, decoded) => {
      if (erorr) {
        return res.json({
          sucess: false,
          message: 'Token is not valid',
        });
      }
      else{
        res.status(200).send(decoded.data)
      }
      


    });
  
  
}


}
}




module.exports=Users;

                    
          
