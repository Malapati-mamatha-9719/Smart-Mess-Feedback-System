import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import AnalyticsStats from "../components/analytics/Analytics";
import DishScorecard from "../components/analytics/DishScorecard";
import FeedbackComments from "../components/analytics/FeedbackComments";
import MonthlyReport from "../components/analytics/MonthlyReport";

export default function HigherAdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "higher_admin") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Navbar />

      <section className="bg-slate-50 min-h-screen pt-28 pb-12">
        <div className="container-custom">

          <h1 className="text-4xl font-bold text-slate-900">
            Higher Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Monitor satisfaction, food wastage and dining performance.
          </p>

          <div className="mt-10">
            <AnalyticsStats />
          </div>

          <div className="mt-8">
            <DishScorecard />
          </div>

          <div className="mt-8">
            <FeedbackComments />
          </div>

          <div className="mt-8">
            <MonthlyReport />
          </div>

        </div>
      </section>
    </>
  );
}
