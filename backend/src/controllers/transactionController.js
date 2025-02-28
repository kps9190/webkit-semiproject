// userController.js
const pool = require('../models/dbPool');
// /api/users/:id

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

//////////////////////////////////////////

//회원가입 처리 메서드
exports.createUser = async (req, res) => {
    const { name, email, passwd } = req.body;
    if (!name || !email || !passwd) {
        return res.status(400).json({ message: '이름,이메일,비밀번호 모두 입력해야 해요' });
    }
    const userData = [name, email, passwd];

    //sql문을 준비
    const sql = `insert into people(name,email,passwd) values(?,?,?)`;
    try {
        const [result] = await pool.query(sql, userData);
        console.log('result: ', result);
        if (result.affectedRows > 0) {
            res.json({ result: 'success', message: `등록 성공 회원번호는 ${result.insertId}번 입니다` });
        } else {
            res.json({ result: 'fail', message: '회원 정보 등록 실패' });
        }
    } catch (err) {
        console.error('error: ', err);
        res.status(500).json({ result: 'fail', message: 'DB 에러 발생: ' + err.message });
    }
};

//이메일 중복여부 체크 - email (unique제약조건을 가짐)
exports.duplicatedEmail = async (req, res) => {
    const { email } = req.body; //post,put
    if (!email) {
        return res.status(400).json({ message: '이메일을 입력하세요' });
    }
    try {
        const sql = `select id from members where email=?`;
        const [result] = await pool.query(sql, [email]);
        console.log('result: ', result);
        //res.json(result);
        //해당 email 이 없다면 빈배열[]을 반환, 있으면 [{id:회원번호}] 를 반환
        if (result.length === 0) {
            //해당 이메일 사용 가능
            res.json({ result: 'ok', message: `${email}은 사용 가능합니다` });
        } else {
            //해당 이메일 이미 사용 중
            res.json({ result: 'no', message: `${email}은 이미 사용 중입니다` });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

//모든 회원 조회
exports.listUser = async (req, res) => {
    const sql = `select id,name,email,indate,refreshtoken from members order by id desc`;
    try {
        const [result] = await pool.query(sql);
        res.json(result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//특정 회원 조회
exports.getUser = async (req, res) => {
    try {
        const sql = `select * from members where id=?`;
        const { id } = req.params;
        const [result] = await pool.query(sql, [id]);
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
};

// /api/users/:id
//회원정보 삭제 : deleteUser 함수 구성
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: '회원번호가 필요해요' });
        }
        const sql = `delete from members where id=?`;
        const [result] = await pool.query(sql, [id]);
        console.log('result: ', result);
        if (result.affectedRows === 0) {
            return res.json({ result: 'fail', message: '삭제할 회원정보는 존재하지 않습니다' });
        }
        res.json({ result: 'success', message: '회원정보를 삭제했습니다' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//회원정보 수정 : updateUser 함수 구성
exports.updateUser = async (req, res) => {
    const { id } = req.params; // put /api/users/10
    //수정할 회원정보 ==> req.body로 추출
    const { name, email, passwd } = req.body;

    try {
        let data = [name, email, id];
        let sql = `UPDATE members SET name=?, email=? WHERE id=?`;

        // passwd가 있을 때만 비밀번호 업데이트
        if (passwd) {
            data = [name, email, passwd, id];
            sql = `UPDATE members SET name=?, email=?, passwd=? WHERE id=?`;
        }
        const [result] = await pool.query(sql, data);
        if (result.affectedRows === 0) {
            return res.json({ result: 'fail', message: '회원정보 수정 실패' });
        }
        res.json({ result: 'success', message: `${id}번 회원님 정보 수정했습니다.` });
    } catch (error) {
        console.error(error);
    }
};
