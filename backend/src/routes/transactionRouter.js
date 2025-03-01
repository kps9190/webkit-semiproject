const express = require('express');
const router = express.Router();
const userController = require('../controllers/transactionController');
//지출/수입 내역 추가
router.post('/', userController.insertTransaction);
//사용자의 전체 내역 조회
router.get('/', userController.listTransaction);
//특정 내역 조회 (GET /transactions/:id)
router.get('/:id', userController.getTransaction);
//내역 수정
router.put(`/:id`, userController.updateTransaction);
//내역 삭제
router.delete('/:id', userController.deleteTransaction);

module.exports = router;
