import { bundleIcon } from "@fluentui/react-icons";
import PropTypes from "prop-types";
import * as FluentIcon from "@fluentui/react-icons";
import * as FluentUI from "@fluentui/react-components";
import { useState } from "react";

const LeftSideBar = ({ setActiveContent }) => {
    const [checked, setChecked] = useState({
        dashboard: true,
        money: false,
        calendar: false,
        setting: false,
        signin: false,
    });

    const [showSignIn, setShowSignIn] = useState(false);

    const toggleCheck = (key) => {
        setChecked((prev) => ({
            dashboard: key === "dashboard",
            money: key === "money",
            calendar: key === "calendar",
            setting: key === "setting",
            signin: key === "signin"
        }));
    };

    const DashboardIcon = bundleIcon(FluentIcon.DataTreemapFilled, FluentIcon.DataTreemapRegular);
    const MoneyIcon = bundleIcon(FluentIcon.ReceiptMoneyFilled, FluentIcon.ReceiptMoneyRegular);
    const CalendarIcon = bundleIcon(FluentIcon.CalendarMonthFilled, FluentIcon.CalendarMonthRegular);
    const SettingsIcon = bundleIcon(FluentIcon.SettingsFilled, FluentIcon.SettingsRegular);
    const SigninIcon = bundleIcon(FluentIcon.PersonArrowRightFilled, FluentIcon.PersonArrowRightRegular);

    return (
        <div className="sidebar">
            <FluentUI.ToggleButton
                appearance="primary"
                checked={checked.dashboard}
                icon={<DashboardIcon />}
                onClick={() => {
                    setActiveContent("DashBoardContent");
                    toggleCheck("dashboard");
                }}
                className="sidebar-button"
            >
                Dashboard
            </FluentUI.ToggleButton>

            <FluentUI.ToggleButton
                appearance="primary"
                checked={checked.money}
                icon={<MoneyIcon />}
                onClick={() => {
                    setActiveContent("IncomeOutcome");
                    toggleCheck("money");
                }}
                className="sidebar-button"
            >
                Income/Outcome
            </FluentUI.ToggleButton>

            <FluentUI.ToggleButton
                appearance="outline"
                checked={checked.calendar}
                icon={<CalendarIcon />}
                onClick={() => toggleCheck("calendar")}
                className="sidebar-button"
            >
                Calendar
            </FluentUI.ToggleButton>

            <FluentUI.ToggleButton
                appearance="subtle"
                checked={checked.setting}
                icon={<SettingsIcon />}
                onClick={() => toggleCheck("setting")}
                className="sidebar-button"
            >
                Setting
            </FluentUI.ToggleButton>

            <FluentUI.ToggleButton
                appearance="transparent"
                checked={checked.signin}
                icon={<SigninIcon />}
                onClick={() => {
                    setShowSignIn(true);
                    toggleCheck("signin");
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

LeftSideBar.propTypes = {
    setActiveContent: PropTypes.func.isRequired, // setActiveContent는 필수 함수
};

export default LeftSideBar;
