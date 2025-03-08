import { bundleIcon } from '@fluentui/react-icons';
import * as FluentIcon from '@fluentui/react-icons';
import * as FluentUI from '@fluentui/react-components';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from 'axios';

const LeftSideBar = () => {
    const { user, logoutUser } = useContext(AuthContext);
    const [checked, setChecked] = useState({
        dashboard: true,
        money: false,
        calendar: false,
        setting: false,
        login: false,
    });

    const [showSignIn, setShowSignIn] = useState(false);

    const toggleCheck = (key) => {
        setChecked((prev) => ({
            dashboard: key === 'dashboard',
            money: key === 'money',
            calendar: key === 'calendar',
            setting: key === 'setting',
            login: key === 'login',
        }));
    };
    const handleLogout = async () => {
        console.log(user);
        if (!user) return; // 유저가 없으면 실행하지 않음

        try {
            await axios.post('http://localhost:7777/api/auth/logout', { email: user.email });

            logoutUser();
            sessionStorage.removeItem('AccessToken');
            localStorage.removeItem('RefreshToken');

            alert('로그아웃 되었습니다.');
            navigate('/Login');
        } catch (error) {
            console.error('로그아웃 중 오류 발생:', error);
            alert('로그아웃 실패: ' + (error.response?.data?.message || '서버 오류'));
        }
    };

    const DashboardIcon = bundleIcon(FluentIcon.DataTreemapFilled, FluentIcon.DataTreemapRegular);
    const MoneyIcon = bundleIcon(FluentIcon.ReceiptMoneyFilled, FluentIcon.ReceiptMoneyRegular);
    const SettingsIcon = bundleIcon(FluentIcon.SettingsFilled, FluentIcon.SettingsRegular);
    const LoginIcon = bundleIcon(FluentIcon.PersonArrowRightFilled, FluentIcon.PersonArrowRightRegular);
    const navigate = useNavigate();

    return (
        <div className="sidebar">
            <FluentUI.ToggleButton
                appearance="primary"
                checked={checked.dashboard}
                icon={<DashboardIcon />}
                onClick={() => {
                    navigate('/');
                    toggleCheck('dashboard');
                }}
                className="sidebar-button"
            >
                Dashboard
            </FluentUI.ToggleButton>
            <FluentUI.ToggleButton
                checked={checked.money}
                icon={<MoneyIcon />}
                onClick={() => {
                    navigate('/IncomeOutcome');
                    toggleCheck('money');
                }}
                className="sidebar-button"
            >
                Income/Outcome
            </FluentUI.ToggleButton>
            <FluentUI.ToggleButton
                appearance="subtle"
                checked={checked.setting}
                icon={<SettingsIcon />}
                onClick={() => {
                    toggleCheck('setting');
                }}
                className="sidebar-button"
            >
                Setting
            </FluentUI.ToggleButton>
            {user && Object.keys(user).length !== 0 ? (
                <FluentUI.ToggleButton
                    appearance="transparent"
                    icon={<LoginIcon />}
                    onClick={handleLogout} // 로그아웃 함수 실행
                    className="sidebar-button"
                >
                    Logout
                </FluentUI.ToggleButton>
            ) : (
                <FluentUI.ToggleButton
                    appearance="transparent"
                    checked={checked.login}
                    icon={<LoginIcon />}
                    onClick={() => {
                        navigate('/Login');
                        toggleCheck('login');
                    }}
                    className="sidebar-button"
                >
                    Login
                </FluentUI.ToggleButton>
            )}
        </div>
    );
};

export default LeftSideBar;
