import { bundleIcon } from "@fluentui/react-icons";
import * as FluentIcon from "@fluentui/react-icons";
import * as FluentUI from "@fluentui/react-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LeftSideBar = () => {
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
            dashboard: key === "dashboard",
            money: key === "money",
            calendar: key === "calendar",
            setting: key === "setting",
            login: key === "login"
        }));
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
                    navigate("/");
                    toggleCheck("dashboard");
                }}
                className="sidebar-button"
            >
                Dashboard
            </FluentUI.ToggleButton>

            <FluentUI.ToggleButton
                checked={checked.money}
                icon={<MoneyIcon />}
                onClick={() => {
                    navigate("/IncomeOutcome");
                    toggleCheck("money");
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
                    navigate("/SignUp");
                    toggleCheck("setting")
                }}
                className="sidebar-button"
            >
                Setting
            </FluentUI.ToggleButton>

            <FluentUI.ToggleButton
                appearance="transparent"
                checked={checked.login}
                icon={<LoginIcon />}
                onClick={() => {
                    navigate("/Login");
                    toggleCheck("login");
                }}
                className="sidebar-button"
            >
                Login
            </FluentUI.ToggleButton>

            {showSignIn && (
                <div className="modal">
                    <button onClick={() => setShowSignIn(false)}>Close</button>
                </div>
            )}
        </div>
    );
};

export default LeftSideBar;
