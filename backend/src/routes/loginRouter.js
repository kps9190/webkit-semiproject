//loginRouter.js
const express = require('express');
const loginController = require('../controllers/loginController');
const router = express.Router();

const verifyMiddleware = require('../middlewares/authMiddleware');

// /api/auth/login
router.post('/login', loginController.login);
router.post('/refresh', loginController.refreshVerify);
router.post('/logout', loginController.logout);

router.get('/user', verifyMiddleware.authenticateToken, loginController.authenticUserInfo);

//인증이 필요한 서비스에는 verifyAccessToken함수를 매개변수로 넣어주자
router.post('/test', verifyMiddleware.authenticateToken, loginController.test);
router.post('/cart', verifyMiddleware.authenticateToken, loginController.cartAdd); //인증된 사용자만 이용할 수 있는 서비스일 경우
module.exports = router;
