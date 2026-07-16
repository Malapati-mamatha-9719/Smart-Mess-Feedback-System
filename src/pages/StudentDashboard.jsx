import Navbar from "../components/layout/Navbar";
import MenuSection from "../components/student/MenuSection";
import { todayMenu } from "../mockdata/menu";
import FeedBackCard from "../components/student/FeedBackCard";
import ActivityCard from "../components/student/ActivityCard";
export default function StudentDashboard() {
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

        <div className="grid md:grid-cols-3 gap-6">

            <MenuSection
            title="Breakfast"
            dishes={todayMenu.breakfast}
            />

            <MenuSection
            title="Lunch"
            dishes={todayMenu.lunch}
            />

            <MenuSection
            title="Dinner"
            dishes={todayMenu.dinner}
            />

        </div>

</div>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">

      <FeedBackCard />

      <ActivityCard />

    </div>
        </div>
      </section>
    </>
  );
}