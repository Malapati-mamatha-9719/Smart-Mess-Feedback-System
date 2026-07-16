import Navbar from "../components/layout/Navbar";
import AnalyticsStats from "../components/analytics/Analytics";
import DishScorecard from "../components/analytics/DishScorecard";
import WastageTrendChart from "../components/analytics/WastageTrendChart";
import SatisfactionTrendChart from "../components/analytics/SatisfactionTrendChart";
import CorrelationCard from "../components/analytics/CorrelationCard";
export default function HigherAdminDashboard() {
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

         <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <WastageTrendChart />
        <SatisfactionTrendChart />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <CorrelationCard />
        </div>
        <div className="mt-8">
        <DishScorecard />
        </div>
       

        </div>
      </section>
    </>
  );
}