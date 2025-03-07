import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect, useContext } from 'react';
import Header from './components/Header';
import Side from './components/Side';
import Home from './components/Home';
import PageNotFound from './components/PageNotFound';
import SignUp from './components/member/SignUp';
import LoginModal from './components/member/LoginModal';
import MyPage from './components/member/MyPage';
import Admin from './components/member/Admin';
import { AuthContext } from './components/member/AuthContext';
import axiosInstance from './components/member/axiosInstance';
function App() {
    // 로그인 모달을 보여줄지 여부값을 갖는 state
    const [showLogin, setShowLogin] = useState(false);

    const { loginAuthUser } = useContext(AuthContext);

    const onShowLoginChange = (bool) => {
        //alert(bool);
        setShowLogin(bool);
    };
    //브라우저 새로고침시 로그인 상태정보 풀리는 문제 해결위해 useEffect훅을 사용하자
    useEffect(() => {
        //세션 스토리지에서 accessToken을 꺼낸다.
        //토큰이 있다면 백엔드쪽에 토큰에 해당하는 사용자 정보를 얻자
        // '/api/auth/user' 로 요청을 보내서 user정보를 받아
        //user정보가 있다면 loginAuthUser(user)
        //세션 스토리지에 저장한 user가 있는지 확인. 있다면 로그인했다는 의미. user정보를 꺼내서 활용하자
        //const tmpUser = JSON.parse(sessionStorage.getItem('user'));
        const accessToken = sessionStorage.getItem('accessToken'); //세션스토리지에서 꺼내기
        // if (accessToken) alert(accessToken);
        //const refreshToken = localStorage.getItem('refreshToken'); //로컬스토리지에서 꺼내기

        if (accessToken) {
            // 토큰이 있다면, 로그인된 상태로 간주
            axiosInstance
                .get('http://localhost:7777/api/auth/user', {
                    //package.json에 proxy 설정하면 http://localhost:7777 생략해도 된다 but 자꾸 오류가 나서 붙이도록 한다
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                })
                .then((response) => {
                    //alert('/api/auth/user요청으로 받음 데이터' + JSON.stringify(response.data));
                    const authUser = {
                        id: response.data.id,
                        email: response.data.email,
                        name: response.data.name,
                    };

                    loginAuthUser(authUser); // 로그인된 사용자 정보 설정
                })
                .catch((error) => {
                    alert(error);
                    console.error('Access token이 유효하지 않습니다.', error);
                    sessionStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                });
        }
    }, []);

    return (
        <div className="container py-5">
            <BrowserRouter>
                {/* BrowserRouter로 앱 전체를 감싸야 라우팅 기능을 사용할 수 있다 */}
                <Container>
                    <Row>
                        <Col className="mb-5">
                            <Header />
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            xs={12}
                            sm={9}
                            md={9}
                            lg={9}
                        >
                            {/* 로그인 모달 다이얼로그 */}
                            <LoginModal
                                show={showLogin}
                                setShow={setShowLogin}
                            />
                            {/* 라우트 */}
                            <Routes>
                                <Route
                                    path="/"
                                    element={<Home />}
                                />
                                <Route
                                    path="/signup"
                                    element={<SignUp />}
                                />
                                <Route
                                    path="/mypage"
                                    element={<MyPage />}
                                />
                                <Route
                                    path="/admin"
                                    element={<Admin />}
                                />
                                <Route
                                    path="/*"
                                    element={<PageNotFound />}
                                />
                            </Routes>
                        </Col>
                        <Col
                            xs={12}
                            sm={3}
                            md={3}
                            lg={3}
                            className="d-none d-sm-block mt-3"
                        >
                            {/* d-none: 모두 안보이게한 뒤 d-sm-block => small사이즈부터 보여준다 */}
                            <Side onShowLogin={onShowLoginChange} />
                        </Col>
                    </Row>
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;
