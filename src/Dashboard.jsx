import { Route, Routes } from "react-router-dom";
import "./Dashboard.css";
import LeftSideBar from "./LeftSideBar.jsx";
import DashBoardContent from "./DashBoardContent.jsx";
import IncomeOutcome from "./IncomeOutcome.jsx";


function Dashboard() {

    return (
        <div className="container">
        <aside className="sidebar">
        <LeftSideBar/>
</aside>

            <main className="content">
                <Routes>
                <Route path="/" element={<DashBoardContent />} />
                <Route path="/IncomeOutcome" element={<IncomeOutcome />} />
                {/*<Route path="/SignUp" element={<SignUp />} />*/}
                {/*<Route path="/SignIn" element={<SignIn />} />*/}
                </Routes>
                </main>
        </div>
    );
}

export default Dashboard;




