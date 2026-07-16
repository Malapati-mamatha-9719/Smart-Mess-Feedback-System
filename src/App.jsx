import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import RoleLogin from "./pages/RoleLogin";
import StudentDashboard from "./pages/StudentDashboard";
import MessAdminDashboard from "./pages/MessAdminDashboard";
import HigherAdminDashboard from "./pages/HigherAdminDashboard";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/:role" element={<RoleLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard/>}/>
        <Route path="/mess-admin-dashboard" element={<MessAdminDashboard/>}/>
        <Route path="/higher-admin-dashboard" element={<HigherAdminDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;