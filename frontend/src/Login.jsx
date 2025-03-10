import * as React from 'react';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './Login.css';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export default function Login(onClick) {
    const [email, setEmail] = useState('');
    const [passwd, setPasswd] = useState('');
    const navigate = useNavigate();
    const { loginAuthUser } = useContext(AuthContext);

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'passwd') {
            setPasswd(value);
        }
    };

    const handleLogin = async () => {
        if (email === '') {
            alert('아이디를 입력하세요.');
            return;
        }
        if (passwd === '') {
            alert('비밀번호를 입력하세요.');
            return;
        }

        console.log('로그인 시도:', { username: email, password: passwd });

        try {
            const response = await axios.post('http://localhost:7777/api/auth/login', {
                email,
                passwd,
            });

            const userInfo = {
                id: response.data.data.id,
                name: response.data.data.name,
                email: response.data.data.email,
            };

            loginAuthUser(userInfo);

            // === 토큰 저장 ===
            if (response.data.accessToken) {
                sessionStorage.setItem('AccessToken', response.data.accessToken);
            }
            if (response.data.refreshToken) {
                localStorage.setItem('RefreshToken', response.data.refreshToken);
            }

            navigate('/');
        } catch (error) {
            console.error('로그인 요청 중 오류 발생:', error);

            if (error.response) {
                alert('로그인 오류: ' + (error.response.data?.message || '서버에서 오류 응답'));
            } else {
                alert('서버 연결 실패: ' + error.message);
            }
        }
    };

    return (
        <div className="login-container">
            <h1>로그인</h1>
            <div className="box">
                <Form.Label className="login-label1">아이디</Form.Label>
                <Form.Control
                    type="text"
                    name="email"
                    className="login-input"
                    value={email}
                    onChange={onChange}
                    placeholder="Email"
                />
            </div>
            <div className="box">
                <Form.Label className="login-label">비밀번호</Form.Label>
                <Form.Control
                    type="password"
                    name="passwd"
                    className="login-input"
                    value={passwd}
                    onChange={onChange}
                    placeholder="Password"
                ></Form.Control>
            </div>
            <div className="clear"></div>
            <Button className="login-button" onClick={handleLogin} style={{ backgroundColor: '#96c6fa' }}>
                로그인
            </Button>
            <div className="button-group">
                <Button
                    appearance="secondary"
                    className="login-find"
                    shape="circular"
                    style={{ backgroundColor: '#96c6fa' }}
                    onClick={() => {
                        navigate('/SignUp');
                    }}
                >
                    회원가입
                </Button>
                <Button
                    appearance="secondary"
                    className="login-find"
                    shape="circular"
                    style={{ backgroundColor: '#96c6fa' }}
                >
                    아이디 찾기
                </Button>
                <Button
                    appearance="secondary"
                    className="login-find"
                    shape="circular"
                    style={{ backgroundColor: '#96c6fa' }}
                >
                    비밀번호 찾기
                </Button>
            </div>
        </div>
    );
}
