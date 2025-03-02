// transactionController.js
const pool = require('../models/dbPool');

//C
exports.insertTransaction = async (req, res) => {
    const { user_id: userId, type, amount, category, description, date } = req.body; // ✅ `userId`를 Body에서 받음 (테스트용)
    // const {userId} = req.userId;
    console.log(userId, type, amount, category, description, date);

    if (!userId || !type || !amount || !category || !date) {
        return res.status(400).json({ message: '모든 필드를 입력해야 합니다.' });
    }
    try {
        const [ret] = await pool.query(
            'INSERT INTO transactions (user_id, type, amount, category, description, date) VALUES (?, ?, ?, ?, ?, ?)',
            [userId, type, amount, category, description, date]
        );
        if (ret.affectedRows === 0) {
            return res.status(500).json({ message: '거래 추가 실패' });
        }
        res.status(201).json({
            message: '거래가 추가되었습니다.',
            transactionId: ret.insertId, // 추가된 거래 ID 반환
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
};

//R
exports.listTransaction = async (req, res) => {
    const { userId } = req.body; // postman 테스트를 위해 body로 userId 전달해줌
    //const userId = req.userId;
    if (!userId) {
        return res.status(400).json({ message: 'userId가 필요합니다.' });
    }
    try {
        const [ret] = await pool.query(
            'select type, amount, category, description, date from transactions where user_id=?',
            [userId]
        );
        return res.status(200).json({ ret });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
};

exports.getTransaction = async (req, res) => {
    const { id } = req.params; // ✅ URL에서 거래 ID 가져오기
    const { userId } = req.body; // ✅ Postman 테스트를 위해 Body에서 `userId` 받기 (JWT 적용 후 수정 필요)
    console.log('요청된 거래 ID:', id);
    console.log('요청된 사용자 ID:', userId);
    if (!id) {
        return res.status(400).json({ message: '거래 ID가 필요합니다.' });
    }
    if (!userId) {
        return res.status(400).json({ message: 'userId가 필요합니다.' });
    }
    try {
        // 🔹 특정 거래 내역 조회 (userId 일치 여부 확인)
        const [result] = await pool.query(
            'SELECT type, amount, category, description, date FROM transactions WHERE id = ? AND user_id = ?',
            [id, userId]
        );
        if (!result.length) {
            return res.status(404).json({ message: '거래 내역을 찾을 수 없습니다.' });
        }
        return res.status(200).json(result); // ✅ 첫 번째 결과만 반환
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
};

//U
exports.updateTransaction = async (req, res) => {
    const { id } = req.params; // /:id
    const { type, amount, category, description, date } = req.body;
    const { userId } = req.body; // postman 테스트를 위해 body로 userId 전달해줌
    //const userId = req.userId;
    // // transaction테이블의 user_id jwt토큰에서 가져와야함

    console.log('요청된 거래 ID:', id);
    console.log('요청된 사용자 ID:', userId);
    try {
        const [result] = await pool.query('select * from transactions where id = ? and user_id = ?', [id, userId]);
        if (!result.length) {
            // 0이면 일치하는 데이터 존재 x
            return res.status(403).json({ message: '수정 권한이 없습니다.' });
        }
        const [ret] = await pool.query(
            'update transactions set type=?, amount=?, category=?, description=?, date=? where id = ?',
            [type, amount, category, description, date, id]
        );
        if (ret.affectedRows === 0) {
            return res.status(404).json({ message: '거래 내역을 찾을 수 없습니다.' });
        }
        res.json({ message: '거래 내역이 수정되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
};

//D
exports.deleteTransaction = async (req, res) => {
    const { id } = req.params;
    // const userId = req.userId;
    const { userId } = req.body;
    try {
        const [result] = await pool.query('select * from transactions where id = ? and user_id = ?', [id, userId]);
        if (!result.length) {
            // 0이면 일치하는 데이터 존재 x
            return res.status(403).json({ message: '삭제 권한이 없습니다.' });
        }
        const [ret] = await pool.query('DELETE FROM transactions WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: '거래 내역을 찾을 수 없습니다.' });
        }
        res.json({ message: '거래 내역이 삭제되었습니다.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: '서버 오류' });
    }
};
