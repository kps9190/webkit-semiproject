const express = require('express');
require('dotenv').config();
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');

//라우터 가져오기
const userRouter = require('./src/routes/userRouter');
const transactionRouter = require('./src/routes/transactionRouter');
const loginRouter = require('./src/routes/loginRouter');

const port = process.env.PORT || 7777;

const app = express();

//미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(morgan('dev'));

//라우터와 연결

app.use('/api/transaction', transactionRouter);
app.use('/api/auth', loginRouter);
app.use('/api/user', userRouter);

//서버 가동
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
