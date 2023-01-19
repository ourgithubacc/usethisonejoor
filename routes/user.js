const express = require("express");
const {
  isAuthenticated,
  isAdmin,
  apiAuth,
  contactEmail,
} = require("../controllers/auth");
const {
  getUserById,
  getUser,
  updateUser,
  getAllUsers,
  deleteUser,
  getDataUserByName,
  getUserByName,
  updateSocial,
} = require("../controllers/user");
const {sendFeedBack} = require('../controllers/feedback')
const router = express();




router.get("/user/:userId", /*apiAuth, isSignedIn, isAuthenticated,*/ getUserById);

router.put("/user/:userId", /*apiAuth, isSignedIn, isAuthenticated,*/ updateUser);
router.get(
  "/users",
  //apiAuth,
  // isAuthenticated,
  // isAdmin,
  getAllUsers
);
router.delete(
  "/user/:userId",
  /*apiAuth,
  isSignedIn,
  isAuthenticated,*/
  deleteUser
);
router.post('/sendFeedback',sendFeedBack)

// Contact us email
//router.post("/sendemail", /*apiAuth,*/ contactEmail);

module.exports = router;
