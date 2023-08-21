const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

// Check Duplicate Emails
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Username
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }
    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }
      next();
    });
  }).catch((err)=>{
      res.status(400).send({
        message: err
      });
  });
};

// Check Roles
checkRolesExisted = (req, res, next) => {
  try {
    if (req.body.roles) {
      for (let i = 0; i < req.body.roles.length; i++) {
        if (!ROLES.includes(req.body.roles[i])) {
          res.status(400).send({
            message: "Failed! Role does not exist = " + req.body.roles[i]
          });
          return;
        }
      }
    }
  } catch (error) {
    res.status(400).send({
      message: "Error: Invalid Input"
    })
    return;
  }
  next();
};

checkNullInputs = (req,res,next) => {
  if(req.body == undefined || req.body == {} || req.body == null){
    res.status(400).send({
      message: "Invalid Inputs"
    });
  }
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted,
  checkNullInputs: checkNullInputs
};
module.exports = verifySignUp;