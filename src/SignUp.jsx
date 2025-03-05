import * as React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './SignUp.css';
import axios from 'axios';

export default function SignUp() {
    const [user, setUser] = useState({ name: '', id: '', password: '' });

    const [nameError, setNameError] = useState(false);
    const [idError, setIdError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [duplexError, setDuplexError] = useState(true);

    const { name, id, password } = user;

    const onSignup = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        if (e.target.name === 'name') {
            setIdError(false);
        }
        if (e.target.name === 'id') {
            setIdError(false);
        }
        if (e.target.name === 'password') {
            setPasswordError(false);
        }
    };

    const handleSign = async () => {
        if (name === '') {
            alert('이름를 입력하세요.');
            return;
        }
        if (id === '') {
            alert('아이디를 입력하세요.');
            return;
        }
        if (password === '') {
            alert('비밀번호를 입력하세요.');
            return;
        }
    };

    const onCheckId = (e) => {
        //아이디 중복체크
        isDuplicatedId();
    };

    const isDuplicatedId = async () => {
        try {
            setDuplexError(true);
            const response = await axios.post('http://localhost', { id });
            const data = response.data;
            if (data.result === 'ok') {
                //중복아닐 경우
                alert(data.message);
                setDuplexError(false);
            } else {
                //중복일 경우
                alert(data.message);
                setUser({ ...user, id: '' });
                setDuplexError(true);
            }
        } catch (error) {
            alert('Error: ' + error);
            setDuplexError(true);
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        // console.log('폼 작동중');

        if (!name) {
            setNameError(true);
            return;
        }
        if (!id) {
            setIdError(true);
            return;
        }
        if (!password) {
            setPasswordError(true);
            return;
        }
        if (duplexError) {
            alert('아이디 중복 체크를 하세요');
            return;
        }
        requestSignUp();
    };

    const requestSignUp = async () => {
        let url = `http://localhost:`;
        try {
            const response = await axios.post(url, user);
            const { result, message } = response.data;
            if (result === 'success') {
                alert(message + '로그인 해주세요');
            } else {
                alert('회원 가입 실패입니다. 다시 시도해주세요');
            }
        } catch (err) {
            if (err.response && (err.response.status === 500 || err.response.status === 400)) {
                alert('이메일 중복체크를 해야해요');
                setDuplexError(true);
            } else {
                alert('Error: ' + err);
            }
        }
    };

    return (
        <div className="login-container">
            <h1>회원가입</h1>
            <form method="post" onSubmit={onSubmit}>
                <div className="namebox">
                    <Form.Label className="login-label">이름</Form.Label>
                    <Form.Control
                        type="name"
                        name="name"
                        className="login-input"
                        value={name}
                        placeholder="name"
                        onChange={onSignup}
                    ></Form.Control>
                </div>
                <div className="box">
                    <Form.Label className="login-label1">아이디</Form.Label>
                    <Form.Control
                        type="text"
                        name="id"
                        className="login-input"
                        value={id}
                        placeholder="ID"
                        onChange={onSignup}
                    ></Form.Control>
                    {/* {idError && <span className="text-danger">아이디를 입력하세요</span>} */}
                    <Button className="check" type="button" onClick={onCheckId}>
                        중복체크
                    </Button>
                </div>
                {/* {passwordError && <span className="text-danger">비밀번호를 입력하세요</span>} */}
                <div className="box">
                    <Form.Label className="login-label2">비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        className="login-input"
                        value={password}
                        placeholder="Password"
                        onChange={onSignup}
                    ></Form.Control>
                </div>
                <div>
                    <Button
                        className="login-button"
                        onClick={handleSign}
                        type="submit"
                        style={{ backgroundColor: '#96c6fa' }}
                    >
                        등록
                    </Button>
                </div>
            </form>
        </div>
    );
}
