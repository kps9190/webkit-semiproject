const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const verifyMiddleware = require('../middlewares/authMiddleware');

//카테고리별 내역 가져오기
router.get('/category', verifyMiddleware.authenticateToken, transactionController.getTransactionsByCategory);
//특정 월별 내역 가져오기
router.get('/month', verifyMiddleware.authenticateToken, transactionController.getTransactionsByMonth);
//지출 내역 가져오기
router.get('/expense', verifyMiddleware.authenticateToken, transactionController.expenseTransaction);
//지출/수입 내역 추가
router.post('/', verifyMiddleware.authenticateToken, transactionController.insertTransaction);
//사용자의 전체 내역 조회
router.get('/', verifyMiddleware.authenticateToken, transactionController.listTransaction);
//특정 내역 조회 (GET /transactions/:id)
router.get('/:id', verifyMiddleware.authenticateToken, transactionController.getTransaction);
//내역 수정
router.put(`/:id`, verifyMiddleware.authenticateToken, transactionController.updateTransaction);
//내역 삭제
router.delete('/:id', verifyMiddleware.authenticateToken, transactionController.deleteTransaction);

module.exports = router;
