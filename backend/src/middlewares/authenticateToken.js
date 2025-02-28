const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ message: '토큰이 없습니다.' });

    jwt.verify(token, process.env.ACCESS_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: '토큰이 유효하지 않습니다.' });

        req.userId = decoded.userId; // 사용자 ID 저장 (users.id)
        next();
    });
};
