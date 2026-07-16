import {
  ArrowRight,
  ChevronDown,
  Leaf,
  Users,
  ClipboardCheck,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import Button from "../common/Button";
import Container from "../layout/Container";


export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-emerald-50/40 to-white pt-24 pb-14">

      {/* Background Blur */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[75vh]">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2">
              <Leaf size={16} className="text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">
                Smart Campus Dining
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-5xl font-bold leading-tight text-slate-900 lg:text-6xl">
              Making Every Meal
              <span className="block text-emerald-600">
                Better Through
              </span>
              Student Feedback
            </h1>

            {/* Description */}
            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
              A digital platform that enables students to share feedback,
              helps mess administrators monitor food quality and wastage,
              and empowers higher authorities with meaningful insights to
              improve the campus dining experience.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Button size="lg">
                Continue to Login
                <ArrowRight size={18} className="ml-2" />
              </Button>

              <Button variant="outline" size="lg">
                Explore Features
              </Button>
            </div>

            {/* Scroll Hint */}
            <div className="mt-16 flex items-center gap-2 text-slate-500">
              <ChevronDown size={18} />
              <span className="text-sm">
                Scroll to learn more
              </span>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
            {/* RIGHT SIDE */}
<motion.div
  initial={{ opacity: 0, x: 30 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.8 }}
  className="relative"
>
  <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl h-full">
    {/* Header */}
    <div className="text-center">
      <div className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
        <MessageSquare className="text-emerald-600" size={32} />
      </div>

      <h3 className="mt-4 text-2xl font-bold text-slate-900">
        Smart Feedback Platform
      </h3>

      <p className="mt-2 text-slate-500">
        One platform connecting everyone.
      </p>
    </div>

    {/* Divider */}
    <div className="mx-auto my-8 h-12 w-px bg-slate-300"></div>

    {/* Roles */}
    <div className="grid grid-cols-3 gap-4">

      <div className="rounded-2xl border border-slate-200 p-5 text-center transition hover:-translate-y-1 hover:shadow-lg">
        <Users className="mx-auto text-emerald-600" size={32} />
        <h4 className="mt-3 font-semibold">Student</h4>
        <p className="mt-2 text-sm text-slate-500">
          Submit Feedback
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 p-5 text-center transition hover:-translate-y-1 hover:shadow-lg">
        <ClipboardCheck className="mx-auto text-blue-600" size={32} />
        <h4 className="mt-3 font-semibold">Mess Admin</h4>
        <p className="mt-2 text-sm text-slate-500">
          Menu & Wastage
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 p-5 text-center transition hover:-translate-y-1 hover:shadow-lg">
        <ShieldCheck className="mx-auto text-purple-600" size={32} />
        <h4 className="mt-3 font-semibold">Higher Admin</h4>
        <p className="mt-2 text-sm text-slate-500">
          Analytics
        </p>
      </div>

    </div>

    {/* Bottom Message */}
    <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
      <p className="text-center font-medium text-emerald-700">
        Together, they create a better campus dining experience.
      </p>
    </div>

  </div>

  {/* Floating Badge */}
  <div className="absolute -right-6 -top-6 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-xl">
    <p className="text-xs text-slate-500">Paperless</p>
    <h4 className="mt-1 text-lg font-bold text-emerald-600">
      Digital Feedback
    </h4>
  </div>
</motion.div>
        </div>
      </Container>
    </section>
  );
}