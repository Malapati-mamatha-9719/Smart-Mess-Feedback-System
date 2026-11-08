import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import AdminStats from "../components/admin/AdminStats";
import MenuForm from "../components/admin/MenuForm";
import WastageForm from "../components/admin/WastageForm";

export default function MessAdminDashboard() {
  const navigate = useNavigate();
  const [statsRefreshKey, setStatsRefreshKey] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "admin") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />

      <section className="bg-slate-50 min-h-screen pt-28 pb-12">
        <div className="container-custom">

          {/* Header */}

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Mess Admin Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Manage menus, record food wastage and monitor feedback.
            </p>
          </div>

          {/* Main Content */}

          <div className="mt-10 grid gap-6">

            {/* Menu Form */}

            <MenuForm />

            {/* Wastage */}

            <WastageForm
              onWastageSubmitted={() => setStatsRefreshKey((k) => k + 1)}
            />

            {/* Analytics */}

            <AdminStats refreshKey={statsRefreshKey} />

          </div>

        </div>
      </section>
    </>
  );
}
