const express = require('express')
const {addNews, getAllNews, getNewsById, getSliderNews, getNewsByCategory, deleteNewsById, updateNewsById, getIperuCampusNews, getMainCampusNews} = require ('../controllers/news')
const router = express.Router()
const {protect, userRoleAuth} = require('../middleware/authMiddleware')
const {
    signup,
    verifyToken,
    signin,
    signout,
    apiAuth,
    sendVerificationCode,
    resetPassWord,
    forgotPassWord,
    authMiddleWare,
    isVerified,
    isSignedIn,
    isAdmin,
    isAuthenticated
    
    
  } = require("../controllers/auth");
  const upload = require('../controllers/multer')
// middleware to be here

router.route('/addNews',upload.array('url') /*isSignedIn, isAuthenticated, isVerified, isAdmin*/).post(addNews);
router.route('/getAllNews/:pageNo/:pageSize', /*isAdmin*/).get(getAllNews)
router.route('/getMainCampusNews').get(getMainCampusNews)
router.route('/getIperuCampusNews').get(getIperuCampusNews)
router.route('/getById/:newsId').get(getNewsById);
router.route('/getAllNews/slider').get(getSliderNews);
router.route('/getByCategory/:catId').get(getNewsByCategory);
router.route('/deleteNewsById/:newsId').delete(deleteNewsById);
router.route('/updateNewsById/:newsId').put(updateNewsById)
module.exports = router 
