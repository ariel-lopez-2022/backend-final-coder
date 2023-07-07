const {Router} = require('express')
const sessionController= require('../controller/session.controller')
const passport = require('passport')
const passportCustom = require('../utils/passportCall')
const { REGISTER_STRATEGY, LOGIN_STRATEGY, JWT_STRATEGY } = require('../config/config')
const { adminPermission, admin } = require('../utils/middleware/isUser')
const { saveDocs } = require('../utils/multer')
const router = Router()

router.get ('/getUsers',sessionController.getUsers)
router.delete ('/deleteUserInactive',passportCustom(JWT_STRATEGY),admin,sessionController.deleteUserInactive)
router.post('/forgotPassword',sessionController.forgotPassword)
router.post('/:uid/documents',passportCustom(JWT_STRATEGY),saveDocs,sessionController.uploadDocuments);
router.post('/register', passport.authenticate(REGISTER_STRATEGY,{session:false}), sessionController.loginRegister)
router.post('/login',passport.authenticate(LOGIN_STRATEGY,{session:false}), sessionController.sessionLogin)
router.get('/logout',sessionController.logout);
router.post('/forgotrecovery/:token',sessionController.forgotrecovery)
router.post('/premium/:uid',sessionController.roleChange)
router.get('/current',passportCustom(JWT_STRATEGY),sessionController.getCurrent)



module.exports = router;