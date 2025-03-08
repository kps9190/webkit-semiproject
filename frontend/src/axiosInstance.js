import axios from 'axios';

const API_BASE_URL = 'http://localhost:7777/api';

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

// 앱 로딩 시 Access Token 갱신하는 함수
async function initializeToken() {
    const refreshToken = localStorage.getItem('RefreshToken');

    if (!refreshToken) {
        console.warn('리프레시 토큰 없음 → 자동 로그인 불가능');
        return;
    }

    try {
        console.log('🔄 앱 로드 시 리프레시 토큰으로 Access Token 갱신 시도');

        const { data } = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            { refreshToken },
            {
                headers: { Authorization: `Bearer ${refreshToken}` },
            }
        );

        if (!data.accessToken) {
            throw new Error('새 AccessToken이 응답에 없음');
        }

        console.log('새로운 Access Token 발급:', data.accessToken);

        // AccessToken을 sessionStorage에 저장
        sessionStorage.setItem('AccessToken', data.accessToken);

        // 토큰이 잘 저장되었는지 확인
        console.log('sessionStorage에 저장된 AccessToken:', sessionStorage.getItem('AccessToken'));
    } catch (error) {
        console.error('자동 로그인 실패:', error);
        handleLogout();
    }
}

// 요청 인터셉터 → Access Token 추가
axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('AccessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터 → Access Token 만료 시 자동 갱신
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('RefreshToken');
                if (!refreshToken) {
                    console.warn('🚨 리프레시 토큰 없음 → 로그아웃 처리');
                    handleLogout();
                    return Promise.reject(new Error('No refresh token'));
                }

                console.log('🔄 리프레시 토큰으로 새 Access Token 요청');

                // 새로운 Access Token 요청
                const { data } = await axios.post(
                    `${API_BASE_URL}/login/refresh`,
                    { refreshToken },
                    {
                        headers: { Authorization: `Bearer ${refreshToken}` },
                    }
                );

                console.log('✅ 새로운 Access Token 발급:', data.accessToken);

                // 새로운 Access Token 저장
                sessionStorage.setItem('AccessToken', data.accessToken);
                originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;

                // 기존 요청 다시 실행
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('🚨 Refresh token expired 또는 오류 발생:', refreshError);
                handleLogout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

// 로그아웃 처리 함수 (토큰 삭제 및 로그인 페이지 이동)
function handleLogout() {
    sessionStorage.removeItem('AccessToken');
    localStorage.removeItem('RefreshToken');
    localStorage.removeItem('user');
    window.location.href = '/login'; // 로그인 페이지로 이동
}

console.log('✅ axiosInstance.js가 실행됨');
initializeToken();

export default axiosInstance;
