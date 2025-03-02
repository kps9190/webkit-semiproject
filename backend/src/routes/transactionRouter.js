const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
//지출/수입 내역 추가
router.post('/', transactionController.insertTransaction);
//사용자의 전체 내역 조회
router.get('/', transactionController.listTransaction);
//특정 내역 조회 (GET /transactions/:id)
router.get('/:id', transactionController.getTransaction);
//내역 수정

router.put(`/:id`, transactionController.updateTransaction);
//내역 삭제
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
