import * as React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import './SignUp.css';
import axios from 'axios';

export default function SignUp() {
    const [user, setUser] = useState({ name: '', email: '', passwd: '' });
    const [pwdChk, setPwdChk] = useState('');

    // 오류 상태 관리
    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwdError, setPasswdError] = useState(false);
    const [passwdChkError, setPasswdChkError] = useState(false);
    const [duplexError, setDuplexError] = useState(true); // 중복 체크 여부

    const { name, email, passwd } = user;

    // 입력값 변경 시 상태 업데이트
    const onSignup = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });

        // 오류 상태 초기화
        if (e.target.name === 'name') {
            setNameError(false);
        }
        if (e.target.name === 'email') {
            setEmailError(false);
        }
        if (e.target.name === 'passwd') {
            setPasswdError(false);
        }
    };

    // 비밀번호 확인
    const onChangePasswdChk = (e) => {
        setPasswdChkError(e.target.value !== passwd); // 비밀번호와 비교
        setPwdChk(e.target.value);
    };

    // 아이디 중복 체크
    const onCheckId = async () => {
        try {
            setDuplexError(true);
            const response = await axios.post('http://localhost:7777/api/user/duplex', { email });
            const data = response.data;

            if (data.result === 'ok') {
                alert(data.message);
                setDuplexError(false); // 중복이 아닐 경우 false
            } else {
                alert(data.message);
                setDuplexError(true);
            }
        } catch (error) {
            alert('서버 오류가 발생했습니다.');
            setDuplexError(true);
        }
    };

    // 회원가입 요청
    const requestSignUp = async () => {
        let url = `http://localhost:7777/api/user/`;
        try {
            const response = await axios.post(url, user);
            const { result, message } = response.data;
            if (result === 'success') {
                alert(message + ' 로그인 해주세요.');
                window.location.href = 'http://localhost:5173/Login';
            } else {
                alert('회원 가입에 실패했습니다. 다시 시도해주세요.');
            }
        } catch (err) {
            if (err.response && (err.response.status === 500 || err.response.status === 400)) {
                alert('이메일 중복 체크를 먼저 해야 합니다.');
                setDuplexError(true);
            } else {
                alert('서버 오류: ' + err);
            }
        }
    };

    // 폼 제출 시 실행
    const onSubmit = (e) => {
        e.preventDefault();

        // 입력값 검증
        if (!name) {
            setNameError(true);
            return;
        }
        if (!email) {
            setEmailError(true);
            return;
        }
        if (!passwd) {
            setPasswdError(true);
            return;
        }
        if (pwdChk !== passwd) {
            setPasswdChkError(true);
            return;
        }
        if (duplexError) {
            alert('아이디 중복 체크를 완료해주세요.');
            return;
        }

        requestSignUp(); // 회원가입 요청
    };

    return (
        <div className="login-container">
            <h1>회원가입</h1>
            <form method="post" onSubmit={onSubmit}>
                {/* 이름 입력 */}
                <div className="namebox">
                    <Form.Label className="login-label">이름</Form.Label>
                    <Form.Control
                        type="text"
                        name="name"
                        className="login-input"
                        value={name}
                        placeholder="이름을 입력하세요"
                        onChange={onSignup}
                    />
                    {nameError && <span className="text-danger">이름을 입력해야 합니다.</span>}
                </div>

                {/* 이메일 입력 및 중복 체크 */}
                <div className="box">
                    <Form.Label className="login-label1">아이디 (이메일)</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        className="login-input"
                        value={email}
                        placeholder="이메일을 입력하세요"
                        onChange={onSignup}
                    />
                    <Button className="check" type="button" onClick={onCheckId}>
                        중복 체크
                    </Button>
                    {emailError && <span className="text-danger">이메일을 입력해야 합니다.</span>}
                </div>

                {/* 비밀번호 입력 */}
                <div className="box">
                    <Form.Label className="login-label2">비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        name="passwd"
                        className="login-input"
                        value={passwd}
                        placeholder="비밀번호를 입력하세요"
                        onChange={onSignup}
                    />
                    {passwdError && <span className="text-danger">비밀번호를 입력해야 합니다.</span>}
                </div>

                {/* 비밀번호 확인 */}
                <div className="box">
                    <Form.Label className="login-label2">비밀번호 확인</Form.Label>
                    <Form.Control
                        type="password"
                        name="pwdChk"
                        className="login-input"
                        value={pwdChk}
                        placeholder="비밀번호를 다시 입력하세요"
                        onChange={onChangePasswdChk}
                    />
                    {passwdChkError && <span className="text-danger">비밀번호가 일치하지 않습니다.</span>}
                </div>

                {/* 회원가입 버튼 */}
                <div>
                    <Button className="login-button" type="submit" style={{ backgroundColor: '#96c6fa' }}>
                        등록
                    </Button>
                </div>
            </form>
        </div>
    );
}
