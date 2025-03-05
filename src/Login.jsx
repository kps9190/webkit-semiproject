import * as React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './Login.css';
import axios from 'axios';

export default function Login(onClick) {
    const [id, setId] = useState('');
    const [pwd, setPwd] = useState('');
    // const navigate = useNavigate();

    const onChange = (e) => {
        const { name, value } = e.target;
        if (name === 'id') {
            setId(value);
        } else if (name === 'pwd') {
            setPwd(value);
        }
    };

    const handleLogin = async () => {
        if (id === '') {
            alert('아이디를 입력하세요.');
            return;
        }
        if (pwd === '') {
            alert('비밀번호를 입력하세요.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:', {
                username: id,
                password: pwd,
                //백엔드에 req.bodt로 값을 받을수있으면 밑에 코드 사용
                // id: id,
                // pwd: pwd,
            });

            if (response.status === 200) {
                alert('로그인 성공');
                // navigate('/Dashboard');
                onClick();
            } else {
                alert('로그인 실패: ' + response.data.message);
            }
        } catch (error) {
            if (error.response) {
                alert('로그인 오류: ' + error.response.data.message);
            } else {
                alert('서버 연결 실패');
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
                    name="id"
                    className="login-input"
                    value={id}
                    onchange={onChange}
                    placeholder="ID"
                />
            </div>
            <div className="box">
                <Form.Label className="login-label">비밀번호</Form.Label>
                <Form.Control
                    type="password"
                    name="pwd"
                    className="login-pwd"
                    value={pwd}
                    onchange={onchange}
                    placeholder="Password"
                ></Form.Control>
            </div>
            <Button className="login-button" onClick={handleLogin} style={{ backgroundColor: '#96c6fa' }}>
                로그인
            </Button>
            <div className="button-group">
                <Button
                    appearance="secondary"
                    className="login-find"
                    shape="circular"
                    style={{ backgroundColor: '#96c6fa' }}
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
