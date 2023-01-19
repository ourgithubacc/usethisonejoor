//const user = require("../models/user");
const User = require("../models/user");

// exports.getUserById = (req, res, next, id) => {
//   User.findById(id).exec((err, user) => {
//     if (err) {
//       return res.status(400).json({
//         error: "No user found in DB",
//       });\
//     }

//     req.profile = user;
//     next();
//   });
// };

// exports.getUserByName = (req, res, next, name) => {
//   User.findOne({ displayName: name }).exec((err, user) => {
//     if (err || !user) {
//       return res.status(400).json({
//         error: "No user found in DB",
//       });
//     }

//     req.xprofile = user;
//     next();
//   });
// };

// exports.getDataUserByName = (req, res) => {
//   req.xprofile.salt = undefined;
//   req.xprofile.encry_password = undefined;
//   req.xprofile.verification_code = undefined;
//   return res.json(req.xprofile);
// };

exports.getUserById = async (req,res,next) =>{
  try {
    const user = await User.findById(req.params.userId)
      if (user){
          res.json({
              success: true,
              data: user
          })
      } else {
           res.json({
              success: false,
              msg:'NO user found'
       })

      }
      
     } catch (error) {
      res.status(500).json({
          success: false,
          msg: 'Internal Error Occured'
      })
  }
}

exports.updateUser = async (req,res,next) =>{
  try {

    
      const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
          new: true,
          runValidators: true
      });
     
      if(user){
      res.status(201).json({
          success: true,
          msg:"Successfully Updated",
          data: user
      });

    }else{
          res.status(401).json({
              success: false,
              msg: "user not found"
          });
      }
      
  } catch (error) {
      console.log(error)
      
      res.status(500).json({
          success: false,
          msg: 'Internal Error Occured'
      })
  }
}


exports.getAllUsers = async (req, res) => { 
  try{
     await User.find({}, (err,users)=>{
    if(users) {
    res.status(200).json({
      success: true,
      users
    })
  } else{
    res.status(400).json({
      success: false,
      msg:"Unable to get users"
    })
  }
    })


//   await User.find({},(err,users)=>{

//     if (err){
//     return  res.status(422).send(err)
//     }

//     if (!users){
//         return res.status(422).send({error:"No data in the collection"})
//     }

//     res.send({Allusers:users})

// })
  

  } catch (error){
    console.log(error)
    res.status(500).json({
      success: false,
      msg: 'Internal Error Occured'
  })
  }
};

exports.deleteUser = async (req,res,next) =>{
  try {
      const user = await User.findByIdAndDelete(req.params.userId);
      
    if(user){
      res.json({
          success: true,
          msg:"Successfully Deleted",
          data: user
      });

    }else{
          res.json({
              success: false,
              msg: "User not found, unable to delete"
          });
      }
      
  } catch (error) {

          res.status(500).json({
              success: false,
              msg: 'Internal Error Occured'
          })
  }
}
