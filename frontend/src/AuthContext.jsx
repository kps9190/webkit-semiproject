import { useState, useEffect, createContext } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});

    // 페이지 로드 시 localStorage에서 로그인 정보 복구
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    // 로그인 시 호출: 사용자 정보를 상태 및 localStorage에 저장
    const loginAuthUser = (userInfo) => {
        setUser(userInfo);
        localStorage.setItem('user', JSON.stringify(userInfo)); // 사용자 정보 저장
    };

    // 로그아웃 시 호출: 상태 및 localStorage에서 사용자 정보 삭제
    const logoutUser = () => {
        setUser(null);
        console.log('🔍 로그아웃 후 user 상태:', user); // 로그아웃 후 상태 확인

        localStorage.removeItem('user');
        localStorage.removeItem('RefreshToken');
        sessionStorage.removeItem('AccessToken');

        setTimeout(() => {
            window.location.reload();
        }, 100);
    };

    return <AuthContext.Provider value={{ user, loginAuthUser, logoutUser }}>{children}</AuthContext.Provider>;
};
