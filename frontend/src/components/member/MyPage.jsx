// MyPage.jsx
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosInstance';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export default function MyPage() {
    const { user, loginAuthUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const [editName, setEditName] = useState();
    const [editEmail, setEditEmail] = useState();
    const [editPasswd, setEditPasswd] = useState();
    const [chkPasswd, setChkPasswd] = useState();

    const [nameError, setNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwdChkError, setPasswdChkError] = useState(false);
    const [duplexError, setDuplexError] = useState(false);

    const onChangeEmail = (e) => {
        setDuplexError(e.target.value !== user.email);
        setEditEmail(e.target.value);
    };
    const onChangePasswd = (e) => {
        setPasswdChkError(e.target.value !== chkPasswd);
        setEditPasswd(e.target.value);
    };
    const onChangeChkPasswd = (e) => {
        setPasswdChkError(e.target.value !== editPasswd);
        setChkPasswd(e.target.value);
    };
    const onCheckEmail = (e) => {
        isDuplicatedEmail();
    };
    const isDuplicatedEmail = async () => {
        try {
            setDuplexError(true);
            const response = await axios.post(`http://localhost:7777/api/user/duplex`, { email: editEmail });
            const data = response.data;
            if (data.result === 'ok') {
                //중복되지 않을 경우
                alert(data.message);
                setDuplexError(false);
            } else {
                //중복 이메일일 경우
                if (editEmail !== user.email) {
                    alert('이미 사용중인 이메일입니다');
                    setDuplexError(true);
                } else {
                    alert('사용 가능합니다');
                    setDuplexError(false);
                }
            }
        } catch (error) {
            alert('Error: ' + error);
            setDuplexError(true);
        }
    };

    // //useEffect()훅에서 로그인 하지 않았다면 홈으로 이동시키자
    // useEffect(() => {
    //     //세션 스토리지에서 accessToken을 꺼낸다.
    //     //토큰이 있다면 백엔드쪽에 토큰에 해당하는 사용자 정보를 얻자
    //     // '/api/auth/user' 로 요청을 보내서 user정보를 받아
    //     //user정보가 있다면 loginAuthUser(user)
    //     //세션 스토리지에 저장한 user가 있는지 확인. 있다면 로그인했다는 의미. user정보를 꺼내서 활용하자
    //     //const tmpUser = JSON.parse(sessionStorage.getItem('user'));
    //     const accessToken = sessionStorage.getItem('accessToken'); //세션스토리지에서 꺼내기
    //     // if (accessToken) alert(accessToken);
    //     //const refreshToken = localStorage.getItem('refreshToken'); //로컬스토리지에서 꺼내기

    //     if (accessToken) {
    //         // 토큰이 있다면, 로그인된 상태로 간주
    //         axiosInstance
    //             .get('http://localhost:7777/api/auth/user', {
    //                 //package.json에 proxy 설정하면 http://localhost:7777 생략해도 된다 but 자꾸 오류가 나서 붙이도록 한다
    //                 headers: {
    //                     Authorization: `Bearer ${accessToken}`,
    //                 },
    //             })
    //             .then((response) => {
    //                 //alert('/api/auth/user요청으로 받음 데이터' + JSON.stringify(response.data));
    //                 const authUser = {
    //                     id: response.data.id,
    //                     email: response.data.email,
    //                     name: response.data.name,
    //                 };

    //                 loginAuthUser(authUser); // 로그인된 사용자 정보 설정
    //             })
    //             .catch((error) => {
    //                 alert('로그인해야 사용할 수 있어요');
    //                 console.error('Access token이 유효하지 않습니다.', error);
    //                 // sessionStorage.removeItem('accessToken');
    //                 // localStorage.removeItem('refreshToken');
    //                 navigate('/');
    //             });
    //     } else {
    //         alert('로그인해야 사용할 수 있어요');
    //         navigate('/');
    //     }
    // }, [user, navigate]);
    useEffect(() => {
        const accessToken = sessionStorage.getItem('accessToken');

        if (accessToken) {
            axiosInstance
                .get('http://localhost:7777/api/auth/user', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    const authUser = {
                        id: response.data.id,
                        email: response.data.email,
                        name: response.data.name,
                    };

                    loginAuthUser(authUser); // 로그인된 사용자 정보 설정
                })
                .catch((error) => {
                    alert('로그인해야 사용할 수 있어요');
                    console.error('Access token이 유효하지 않습니다.', error);
                    navigate('/');
                });
        } else {
            alert('로그인해야 사용할 수 있어요');
            navigate('/');
        }
    }, [navigate]); // 의존성에서 user 제거

    useEffect(() => {
        // user가 처음 로드될 때만 기본값 설정
        if (user && !edit) {
            setEditName(user.name);
            setEditEmail(user.email);
        }
    }, [user, edit]); // user 의존성 추가

    const requestEdit = async () => {
        try {
            const update_response = await axios.put(`http://localhost:7777/api/user/${user.id}`, {
                name: editName,
                email: editEmail,
                passwd: editPasswd,
            });
            alert('수정되었습니다');
            const updatedUser = {
                id: user.id,
                name: editName,
                email: editEmail,
            };
            loginAuthUser(updatedUser); // 사용자 정보 업데이트
            setEditName(updatedUser.name);
            setEditEmail(updatedUser.email); // 새 정보 반영
            setEdit(false); // 수정 종료
        } catch (error) {
            alert('에러 ', error);
        }
    };

    const onSubmit = () => {
        if (nameError) {
            alert('이름을 입력하세요');
            return;
        }
        if (emailError) {
            alert('이메일을 입력하세요');
            return;
        }
        if (passwdChkError) {
            alert('비밀번호가 일치하지 않아요');
            return;
        }
        if (editPasswd === '') {
            alert('비밀번호를 입력해주세요');
            return;
        }
        if (duplexError) {
            alert('이메일 중복 여부를 체크하세요');
            return;
        }
        requestEdit();
        setEdit(false);
    };

    const deleteUser = async (id) => {
        const confiremd = window.confirm('정말로 탈퇴하시겠습니까?');
        if (!confiremd) return;

        let url = `http://localhost:7777/api/user/${id}`;
        try {
            await axios.delete(url);
            alert('탈퇴 되었습니다');
            navigate('/');
        } catch (err) {
            alert('에러 발생 ', err);
        }
    };

    return (
        <div className="container py-4">
            <h1 className="my-4">MyPage</h1>

            {!edit && user && (
                <div className="alert alert-primary p-3">
                    <h3>회원번호: {user.id} </h3>
                    <h3>이 름 : {editName} </h3>
                    <h3>이 메 일 : {editEmail} </h3>
                    <Button
                        className="btn me-2"
                        onClick={() => {
                            setEdit(true);
                        }}
                    >
                        회원정보 수정
                    </Button>
                    <Button
                        className="btn btn-danger"
                        onClick={() => deleteUser(user.id)}
                    >
                        회원 탈퇴
                    </Button>
                </div>
            )}
            {edit && user && (
                <form
                    action="/input"
                    method="put"
                    onSubmit={onSubmit}
                >
                    <div className="alert alert-primary p-3">
                        <h3>회원번호: {user.id} </h3>
                        <h3>
                            이 름 :
                            <input
                                type="text"
                                value={editName}
                                onChange={(e) => {
                                    setEditName(e.target.value);
                                    if (e.target.value === '') setNameError(true);
                                    else setNameError(false);
                                }}
                                className="form-control"
                            />{' '}
                            {nameError && <h6 className="text-danger">이름을 입력해야 해요</h6>}
                        </h3>
                        <h3>
                            이 메 일 :
                            <input
                                type="email"
                                value={editEmail}
                                onChange={(e) => {
                                    onChangeEmail(e);
                                    if (e.target.value === '') setEmailError(true);
                                    else setEmailError(false);
                                }}
                                className="form-control"
                            />
                        </h3>
                        <button
                            className="btn btn-outline-success"
                            type="button"
                            onClick={onCheckEmail}
                        >
                            중복체크
                        </button>
                        {emailError && <h6 className="text-danger">Email을 입력해야 해요</h6>}
                        <h3>
                            비밀번호 :
                            <input
                                type="password"
                                name="passwd"
                                id="passwd"
                                value={editPasswd}
                                onChange={onChangePasswd}
                                className="form-control"
                            />
                        </h3>
                        <h3>
                            비밀번호 확인:
                            <input
                                type="password"
                                name="pwdChk"
                                id="pwdChk"
                                value={chkPasswd}
                                onChange={onChangeChkPasswd}
                                className="form-control"
                            />
                        </h3>
                        {passwdChkError && <h6 className="text-danger">비밀번호가 일치하지 않아요</h6>}
                        <Button
                            className="btn me-2"
                            onClick={() => {
                                onSubmit();
                            }}
                        >
                            회원정보 수정
                        </Button>
                        <Button
                            className="btn btn-danger"
                            onClick={() => {
                                setEdit(false);
                                setEditName(user.name);
                                setEditEmail(user.email);
                                setEditPasswd('');
                                setChkPasswd('');
                            }}
                        >
                            취소
                        </Button>
                    </div>
                </form>
            )}

            {!user && (
                <div className="alert alert-danger p-3">
                    <h3>로그인한 사용자만 확인할 수 있어요</h3>
                </div>
            )}
        </div>
    );
}
