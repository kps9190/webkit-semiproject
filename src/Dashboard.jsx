import './Dashboard.css';
import LeftSideBar from './LeftSideBar.jsx';
import DashBoardContent from './DashBoardContent.jsx';
import Login from './Login.jsx';

// Dashboard 컴포넌트
function Dashboard() {
    return (
        <div className="container">
            <aside className="sidebar">
                <LeftSideBar />
            </aside>
            <main className="content">
                <Login />
            </main>
        </div>
    );
}

export default Dashboard;
