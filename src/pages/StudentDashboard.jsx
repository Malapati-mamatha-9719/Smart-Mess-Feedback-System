import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import MenuSection from "../components/student/MenuSection";
import FeedbackCard from "../components/student/FeedbackCard";
import ActivityCard from "../components/student/ActivityCard";
import AttendanceMarker from "../components/student/AttendanceMarker";

const API_BASE_URL = "http://127.0.0.1:8000";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token || role !== "student") {
      navigate("/login");
      return;
    }

    const fetchMenu = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/menu/today`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          setError("Could not load today's menu.");
          return;
        }

        const data = await response.json();
        setMenuItems(data);
      } catch (err) {
        setError("Could not reach the server. Please make sure the backend is running.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [navigate]);

  const breakfast = menuItems.filter((item) => item.meal_type === "breakfast");
  const lunch = menuItems.filter((item) => item.meal_type === "lunch");
  const dinner = menuItems.filter((item) => item.meal_type === "dinner");

  return (
    <>
      <Navbar />

      <section className="bg-slate-50 min-h-screen pt-28 pb-12">
        <div className="container-custom">

          <h1 className="text-4xl font-bold text-slate-900">
            Student Dashboard
          </h1>

          <p className="mt-2 text-slate-600">
            Welcome back, Student
          </p>

          <div className="mt-10">

            <h2 className="text-2xl font-bold mb-6">
              Today's Menu
            </h2>

            {loading && (
              <p className="text-slate-500">Loading today's menu...</p>
            )}

            {error && (
              <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {!loading && !error && (
              <div className="grid md:grid-cols-3 gap-6">

                <MenuSection
                  title="Breakfast"
                  dishes={breakfast}
                />

                <MenuSection
                  title="Lunch"
                  dishes={lunch}
                />

                <MenuSection
                  title="Dinner"
                  dishes={dinner}
                />

              </div>
            )}

          </div>

          {!loading && !error && (
            <div className="mt-6">
              <AttendanceMarker menuItems={menuItems} />
            </div>
          )}

          <div className="mt-12 grid gap-6 lg:grid-cols-2">

            <FeedbackCard menuItems={menuItems} />

            <ActivityCard />

          </div>
        </div>
      </section>
    </>
  );
}
