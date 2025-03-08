import * as React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './css/SignUp.css';
import axios from 'axios';

export default function SignUp() {
    const navigate = useNavigate();

    const [user, setUser] = useState({ name: '', email: '', password: '' });
    const [pwdChk, setPwdChk] = useState('');

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [passwdChkError, setPasswdChkError] = useState(false);
    const [duplexError, setDuplexError] = useState(true);

    const { name, email, password } = user;

    const onSignup = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
        if (e.target.name === 'name') {
            setNameError(false);
        }
        if (e.target.name === 'email') {
            setEmailError(false);
        }
        if (e.target.name === 'password') {
            setPasswordError(false);
        }
    };

    const onChangePasswdChk = (e) => {
        setPasswdChkError(e.target.value !== password);
        setPwdChk(e.target.value);
    };

    const onCheckEmail = (e) => {
        //아이디 중복체크
        isDuplicatedEmail();
    };

    const isDuplicatedEmail = async () => {
        try {
            setDuplexError(true);
            const response = await axios.post('http://localhost:7777/api/user/duplex', { email });
            const data = response.data;
            if (data.result === 'ok') {
                //중복아닐 경우
                alert(data.message);
                setDuplexError(false);
            } else {
                //중복일 경우
                alert(data.message);
                setUser({ ...user, email: '' });
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
        if (!email) {
            setEmailError(true);
            return;
        }
        if (!password) {
            setPasswordError(true);
            return;
        }
        if (password !== pwdChk) {
            setPasswdChkError(true);
            return;
        }
        if (duplexError) {
            alert('이메일 중복 체크를 하세요');
            return;
        }
        requestSignUp();
    };

    const requestSignUp = async () => {
        let url = `http://localhost:7777/api/user`;
        try {
            const tmp = { name: user.name, email: user.email, passwd: user.password };
            const response = await axios.post(url, tmp);
            const { result, message } = response.data;
            if (result === 'success') {
                alert(message + ' 로그인 해주세요');
                navigate('/Login');
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
            <form
                method="post"
                onSubmit={onSubmit}
            >
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
                    {nameError && <span className="text-danger">이름을 입력해야 해요</span>}
                    {/* CSS 적용 필요 */}
                </div>
                <div className="box">
                    <Form.Label className="login-label1">이메일</Form.Label>
                    <Form.Control
                        type="text"
                        name="email"
                        className="login-input"
                        value={email}
                        placeholder="email"
                        onChange={onSignup}
                    ></Form.Control>
                    {emailError && <span className="text-danger">이메일을 입력해야 해요</span>}
                    {/* {emailError && <span className="text-danger">아이디를 입력하세요</span>} */}
                    <Button
                        className="check"
                        type="button"
                        onClick={onCheckEmail}
                    >
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
                    {passwordError && <span className="text-danger">비밀번호을 입력해야 해요</span>}
                </div>
                <div className="box">
                    <Form.Label className="login-label2">비밀번호 확인</Form.Label>
                    <Form.Control
                        type="password"
                        name="pwdChk"
                        className="login-input"
                        value={pwdChk}
                        placeholder="Password"
                        onChange={onChangePasswdChk}
                    ></Form.Control>
                    {passwdChkError && <span className="text-danger">비밀번호 확인을 입력해야 해요</span>}
                </div>
                <div>
                    <Button
                        className="login-button"
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
