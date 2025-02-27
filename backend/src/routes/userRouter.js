const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// server.js에서
// /api/users ===>userRouter와 연결
//모든 회원 조회
router.get('/', userController.listUser);
//특정 회원 조회
router.get('/:id', userController.getUser);
//회원 등록 요청
router.post('/', userController.createUser);

//회원 등록 또는 수정시 아이디(email) 중복 체크
// post /api/users/duplex    email값은 request의 body에 포함되어 들어감
router.post(`/duplex`, userController.duplicatedEmail);

//회원 삭제 요청
router.delete('/:id', userController.deleteTransaction);

//회원 수정 요청
router.put(`/:id`, userController.updateTransaction);

module.exports = router;
