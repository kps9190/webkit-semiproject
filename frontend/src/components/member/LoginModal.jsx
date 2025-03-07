// LoginModal.jsx
import React, { useState, useRef, useContext } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from './AuthContext';

export default function LoginModal({ show, setShow }) {
    const [loginUser, setLoginUser] = useState({ email: '', passwd: '' });

    const navigate = useNavigate();
    /////////////////////////
    const { loginAuthUser } = useContext(AuthContext);
    //////////////////////////
    const idRef = useRef(null);
    const pwRef = useRef(null);

    const { email, passwd } = loginUser;

    console.log(loginUser.email, loginUser['email']);

    const onChangeHandler = (e) => {
        setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        //유효성 체크 - alert띄우고 입력 포커스 준뒤 return;
        if (!email) {
            alert('아이디를 입력하세요');
            idRef.current.focus();
            return;
        }
        if (!passwd) {
            alert('비밀번호를 입력하세요');
            pwRef.current.focus();
            return;
        }
        //백엔드 쪽에 요청 보내기 - post /api/login   {email,passwd}
        requestLogin();
    };
    const requestLogin = async () => {
        let url = `http://localhost:7777/api/auth/login`;
        try {
            const response = await axios.post(url, loginUser);
            //alert(JSON.stringify(response));
            const { result } = response.data;

            //1. 서버쪽에서 회원이 맞는지 체크해서 맞으면 로그인한 사용자의 정보(name, email)를 보낸다
            //  ==> 먼저 구현하고 2번으로 수정
            //2. 서버쪽에서 회원이 맞는지 체크해서 맞으면 인증토큰 (name, email,accessToken, refreshToken)을 보낸다

            if (result === 'success') {
                const authUser = response.data.data; //인증받은 사용자 정보를 가지고 있다
                //==> 사용자 정보를 Side컴포넌트에서 "xxx님 로그인 중..." 식으로 사용
                //===> authUser를 props로 전달하던지 아니면 context api를 사용해서 전역적인 state로 관리하던지...
                alert(response.data.message + ` ${authUser.name}님 환영합니다`);
                //////////////////////
                loginAuthUser(authUser); //Context api를 통해 공급받은 loginAuthUser를 통해 전역 상태를 업데이트
                //로그인한 회원정보를 sessionStorage에 저장하자 ==>accessToken으로 대체
                //sessionStorage.setItem('user', JSON.stringify(authUser));
                //발급받은 토큰 저장하기
                const { accessToken, refreshToken } = response.data;
                sessionStorage.setItem('accessToken', accessToken); //15분 사용 가능 => 세션 스토리지에 저장
                localStorage.setItem('refreshToken', refreshToken); //1일 사용 가능 => 로컬 스토리지에 저장
                ///////////////////////
                inputClear();
                setShow(false); //모달 창 닫기
                navigate('/');
            } else {
                //로그인 실패인 경우
                const { message } = response.data;
                alert(message);
                //setLoginUser({ email: '', passwd: '' });
                //입력값 비우기
                inputClear();
                idRef.current.focus();
            }
        } catch (error) {
            alert('Error: ' + error);
            inputClear();
            setShow(false); //모달창 닫기
        }
    };

    const inputClear = () => {
        setLoginUser({ ...loginUser, email: '', passwd: '' });
    };

    return (
        <div>
            {/* 로그인 모달 */}
            <Modal show={show} onHide={() => setShow(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row className="LoginForm">
                        <Col className="p-4 mx-auto" xs={10} sm={10} md={8}>
                            <Form onSubmit={onSubmitHandler}>
                                <Form.Group className="mb-3">
                                    <Form.Label>ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        id="email"
                                        ref={idRef}
                                        name="email"
                                        onChange={onChangeHandler}
                                        value={loginUser.email}
                                        placeholder="ID (email)"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        id="passwd"
                                        ref={pwRef}
                                        name="passwd"
                                        onChange={onChangeHandler}
                                        value={loginUser.passwd}
                                        placeholder="Password"
                                    />
                                </Form.Group>
                                <div className="d-grid gap-2">
                                    <Button type="submit" variant="outline-success">
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </div>
    );
}
