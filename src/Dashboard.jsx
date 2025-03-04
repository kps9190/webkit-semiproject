import { useState } from "react";
import "./Dashboard.css";
import LeftSideBar from "./LeftSideBar.jsx";
import DashBoardContent from "./DashBoardContent.jsx";
import IncomeOutcome from "./IncomeOutcome.jsx";


function Dashboard() {
    const [activeContent, setActiveContent] = useState("DashBoardContent");

    return (
        <div className="container">
            {/* Sidebar for navigation */}
            <aside className="sidebar">
                <LeftSideBar setActiveContent={setActiveContent} />
            </aside>

            {/* Main content area - dynamically rendered */}
            <main className="content">
                {activeContent === "DashBoardContent" && <DashBoardContent />}
                {activeContent === "IncomeOutcome" && <IncomeOutcome />}
                {/*{activeContent === "Calendar" && <Calendar />}*/}
                {/*{activeContent === "Login" && <Login />}*/}


            </main>
        </div>
    );
}

export default Dashboard;




