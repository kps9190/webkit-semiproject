const pool = require('../models/dbPool');
const jwt = require('jsonwebtoken');
require('dotenv').config(); //secret key 값 가져오기 위해 설정
//npm i dotenv
//JWT 토큰을 생성해서 반환하는 함수
const generateToken = (user, secret, expiresIn) => {
    return jwt.sign(user, secret, { expiresIn });
};

exports.login = async (req, res) => {
    const { email, passwd } = req.body;
    console.log(`email: ${email}, passwd: ${passwd}`);
    try {
        const sql = 'select id,name,email from users where email=? and passwd=?';

        const [result] = await pool.query(sql, [email, passwd]);
        console.log('result: ', result);
        if (result.length === 0) {
            //아이디, 비번이 일치하지 않는 경우
            return res.status(401).json({ result: 'fail', message: '아이디 또는 비밀번호를 확인하세요' });
        }
        //회원으로 인증받은 경우-------------> accessToken 과 refreshToken을 생성
        //아이디,비번이 일치하는 경우 => 회원 인증을 해줘야 한다
        const user = result[0]; //회원정보 꺼내기 (id,email,name)
        console.log(process.env.ACCESS_SECRET);
        console.log(process.env.REFRESH_SECRET);

        const accessToken = generateToken(user, process.env.ACCESS_SECRET, '15m');
        //토큰 유효시간 15분 설정
        //console.log('accessToken: ', accessToken);

        const refreshToken = generateToken(user, process.env.REFRESH_SECRET, '1d'); //유효시간 1일 설정
        //console.log('refreshToken: ', refreshToken);

        //members테이블에 refreshToken값(null===>발급받은 refreshtoken으로)을 수정해줘야 한다
        const sql2 = 'update users set refreshtoken =? where id=?';
        await pool.query(sql2, [refreshToken, user.id]);

        res.json({ result: 'success', data: user, message: '로그인 성공!!', accessToken, refreshToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'DB Error', message: error.message });
    }
};

//refreshToken을 검증하여 타당할 경우 새 accessToken을 발급하는 메서드
exports.refreshVerify = (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(401).json({ message: 'refresh token이 없어요' });

    jwt.verify(refreshToken, process.env.REFRESH_SECRET, async (err, decoded) => {
        if (err) {
            //인증받지 못한 토큰일 경우
            return res.status(403).json({ message: 'Invalid Refresh Token' });
        }
        //제대로 인증된 토큰 일 경우
        //DB에서 해당 user정보 가져오기
        const sql = `select id,name,email from users where refreshToken=?`;
        const [result] = await pool.query(sql, [refreshToken]);
        if (result.length === 0) {
            return res.status(403).json({ message: '인증받지 않은 회원입니다' });
        }
        const user = result[0];
        //새 accessToken 발급
        const newAccessToken = generateToken(user, process.env.ACCESS_SECRET, '15m');
        res.json({ accessToken: newAccessToken });
    });
};
//----------------------
exports.logout = async (req, res) => {
    const { email } = req.body;
    //refreshToken값을 null로 수정
    try {
        const sql = `update users set refreshToken=null where email=?`;
        const [result] = await pool.query(sql, [email]);
        if (result.affectedRows > 0) {
            res.json({ result: 'success', message: '로그아웃 처리 되었습니다' });
        } else {
            res.status(400).json({ message: '유효하지 않은 사용자 입니다' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'DB Error-로그아웃 중 에러 발생 ' + error });
    }
}; //-------------------------
exports.authenticUserInfo = (req, res) => {
    res.json(req.user);
}; //------------------------

exports.test = (req, res) => {
    res.json({ message: '테스트 중- 검증된 사용자가 입장했어요 회원명: ' + req.user.name });
};
exports.cartAdd = (req, res) => {
    res.send('<h1>장바구니에 상품이 추가되었습니다 [인증된 사용자만 이용 가능한 서비스]</h1>');
};
