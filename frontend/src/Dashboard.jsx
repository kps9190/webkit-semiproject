import { Route, Routes } from 'react-router-dom';
import './Dashboard.css';
import LeftSideBar from './LeftSideBar.jsx';
import DashBoardContent from './DashBoardContent.jsx';
import IncomeOutcome from './IncomeOutcome.jsx';
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';

function Dashboard() {
    return (
        <div className="container">
            <aside className="sidebar">
                <LeftSideBar />
            </aside>

            <main className="content">
                <Routes>
                    <Route path="/" element={<DashBoardContent />} />
                    <Route path="/IncomeOutcome" element={<IncomeOutcome />} />
                    <Route path="/SignUp" element={<SignUp />} />
                    <Route path="/Login" element={<Login />} />
                </Routes>
            </main>
        </div>
    );
}

export default Dashboard;
