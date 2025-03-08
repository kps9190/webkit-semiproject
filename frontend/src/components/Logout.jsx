import { useContext } from 'react';
import { AuthContext } from './member/AuthContext';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const { logoutUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        logoutUser();
        navigate('/Login');
    };

    return (
        <div>
            <h1>로그아웃</h1>
            <button onClick={handleLogout}>로그아웃</button>
        </div>
    );
}

export default Logout;
