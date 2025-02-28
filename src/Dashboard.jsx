import "./Dashboard.css";
import LeftSideBar from "./LeftSideBar.jsx";
import DashBoardContent from "./DashBoardContent.jsx";


// Dashboard 컴포넌트
function Dashboard() {
    return (
        <div className="container">
            <aside className="sidebar">
                <LeftSideBar />
            </aside>
            <main className="content">
                <DashBoardContent />
            </main>
        </div>
    );
}

export default Dashboard;



