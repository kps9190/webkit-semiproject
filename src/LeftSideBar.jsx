import { bundleIcon } from '@fluentui/react-icons';
import * as FluentIcon from '@fluentui/react-icons';
import * as FluentUI from '@fluentui/react-components';
import { useState } from 'react';

const LeftSideBar = () => {
    const [checkedDashboard, setCheckedDashboard] = useState(false);
    const [checkedMoney, setCheckedMoney] = useState(false);
    const [checkedCalendar, setCheckedCalendar] = useState(false);
    const [checkedSetting, setCheckedSetting] = useState(false);
    const [checkedSignin, setCheckedSignin] = useState(false);
    const [checkedSignout, setCheckedSignout] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false); // 모달 상태

    const DashboardIcon = bundleIcon(FluentIcon.DataTreemapFilled, FluentIcon.DataTreemapRegular);
    const MoneyIcon = bundleIcon(FluentIcon.ReceiptMoneyFilled, FluentIcon.ReceiptMoneyRegular);
    const CalendarIcon = bundleIcon(FluentIcon.CalendarMonthFilled, FluentIcon.CalendarMonthRegular);
    const SettingsIcon = bundleIcon(FluentIcon.SettingsFilled, FluentIcon.SettingsRegular);
    const SigninIcon = bundleIcon(FluentIcon.PersonArrowRightFilled, FluentIcon.PersonArrowRightRegular);
    const SignoutIcon = bundleIcon(FluentIcon.PersonArrowLeftFilled, FluentIcon.PersonArrowLeftRegular);

    return (
        <>
            <div>
                <FluentUI.ToggleButton
                    appearance=""
                    checked={checkedDashboard}
                    icon={checkedDashboard ? <DashboardIcon /> : <FluentIcon.DataTreemapRegular />}
                    onClick={() => setCheckedDashboard((prev) => !prev)}
                    style={{ fontSize: 30, padding: '1em', margin: '1px' }}
                >
                    Dashboard
                </FluentUI.ToggleButton>
            </div>
            <hr />
            <div>
                <FluentUI.ToggleButton
                    appearance="primary"
                    checked={checkedMoney}
                    icon={checkedMoney ? <MoneyIcon /> : <FluentIcon.ReceiptMoneyRegular />}
                    onClick={() => setCheckedMoney((prev) => !prev)}
                    style={{ fontSize: 20, padding: '10%', margin: '1px' }}
                >
                    Income/Outcome
                </FluentUI.ToggleButton>
            </div>
            <hr />
            <div>
                <FluentUI.ToggleButton
                    appearance="outline"
                    checked={checkedCalendar}
                    icon={checkedCalendar ? <CalendarIcon /> : <FluentIcon.CalendarMonthRegular />}
                    onClick={() => setCheckedCalendar((prev) => !prev)}
                    style={{ fontSize: 30, padding: '1em', margin: '1px' }}
                >
                    Calendar
                </FluentUI.ToggleButton>
            </div>
            <hr />
            <div>
                <FluentUI.ToggleButton
                    appearance="subtle"
                    checked={checkedSetting}
                    icon={checkedSetting ? <SettingsIcon /> : <FluentIcon.SettingsRegular />}
                    onClick={() => setCheckedSetting((prev) => !prev)}
                    style={{ fontSize: 30, padding: '1em', margin: '1px' }}
                >
                    Setting
                </FluentUI.ToggleButton>
            </div>
            <hr />
            <div>
                <FluentUI.ToggleButton
                    appearance="transparent"
                    checked={checkedSignin}
                    icon={
                        checkedSignin ? (
                            <SigninIcon style={{ fontSize: 50 }} />
                        ) : (
                            <FluentIcon.PersonArrowRightRegular
                                style={{ fontSize: 50, padding: '1px', margin: '1px' }}
                            />
                        )
                    }
                    onClick={() => {
                        setShowSignIn(true);
                        setCheckedSignin((prev) => !prev);
                    }}
                    style={{ fontSize: 30, padding: '1em', margin: '1px' }}
                >
                    Login
                </FluentUI.ToggleButton>
                {/* SignIn 모달 */}
                {showSignIn && (
                    <div className="modal">
                        {/*<SignIn />*/}
                        <button onClick={() => setShowSignIn(false)}>Close</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default LeftSideBar;
