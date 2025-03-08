import { Route, Routes } from 'react-router-dom';
import './css/Dashboard.css';
import LeftSideBar from './LeftSideBar.jsx';
import DashBoardContent from './DashBoardContent.jsx';
import IncomeOutcome from './IncomeOutcome.jsx';
import Login from './Login.jsx';
import Logout from './Logout.jsx';
import SignUp from './SignUp.jsx';
import { useContext } from 'react';
import { AuthContext } from './member/AuthContext.jsx';

function Dashboard() {
    const { user, loginAuthUser } = useContext(AuthContext);
    return (
        <div className="container">
            <aside className="sidebar">
                <LeftSideBar />
            </aside>

            <main className="content">
                <Routes>
                    <Route
                        path="/"
                        element={<DashBoardContent />}
                    />
                    <Route
                        path="/IncomeOutcome"
                        element={<IncomeOutcome />}
                    />
                    <Route
                        path="/SignUp"
                        element={<SignUp />}
                    />
                    <Route
                        path="/Login"
                        element={user ? <Logout /> : <Login />}
                    />
                </Routes>
            </main>
        </div>
    );
}

export default Dashboard;
