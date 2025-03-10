const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    console.log('미들웨어 실행됨'); //로그 추가

    const authHeader = req.headers['authorization'];
    console.log('요청 헤더:', authHeader); //요청 헤더 확인

    if (!authHeader) {
        console.log('Authorization 헤더 없음');
        return res.status(401).json({ message: '토큰이 없습니다. 로그인하세요.' });
    }

    const token = authHeader.split(' ')[1]; // Bearer 제거 후 토큰 추출

    if (!token) {
        console.log('토큰이 없습니다.');
        return res.status(401).json({ message: '유효한 토큰을 제공하세요.' });
    }

    jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
        if (err) {
            console.log('미들웨어에서 토큰 검증 실패:', err.message);
            return res.status(403).json({ message: '토큰이 유효하지 않습니다.' });
        }

        console.log('토큰 검증 완료, 사용자 정보:', decoded);
        req.user = decoded;
        next();
    });
};

module.exports = { authenticateToken };
