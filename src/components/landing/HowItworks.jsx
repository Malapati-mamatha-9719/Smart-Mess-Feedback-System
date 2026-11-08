import {
  UserRound,
  MessageSquare,
  CookingPot,
  BarChart3,
  ArrowRight,
  Leaf,
} from "lucide-react";

import Container from "../layout/Container";
import SectionTitle from "../common/SectionTitle";

const steps = [
  {
    title: "Student",
    description: "View today's menu and submit feedback after every meal.",
    icon: UserRound,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
  {
    title: "Feedback Platform",
    description: "Collects feedback and stores data securely for analysis.",
    icon: MessageSquare,
    color: "text-blue-600",
    bg: "bg-blue-100",
    featured: true,
  },
  {
    title: "Mess Admin",
    description: "Publishes menus and records daily food wastage.",
    icon: CookingPot,
    color: "text-orange-600",
    bg: "bg-orange-100",
  },
  {
    title: "Higher Admin",
    description: "Monitors reports and makes data-driven decisions.",
    icon: BarChart3,
    color: "text-purple-600",
    bg: "bg-purple-100",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50">
      <Container>
        <SectionTitle
          badge="How It Works"
          title="A Simple Workflow for Better Campus Dining"
          description="Smart Mess Feedback connects students, mess administrators, and higher authorities through one seamless platform."
        />

        <div className="mt-20 flex flex-col lg:flex-row items-center justify-between gap-6">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <>
                <div
                  key={step.title}
                  className={`relative rounded-3xl border bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
                  ${
                    step.featured
                      ? "border-emerald-300 lg:scale-105"
                      : "border-slate-200"
                  }
                  w-full lg:w-72`}
                >
                  {step.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-1 text-xs font-semibold text-white">
                      Core Platform
                    </span>
                  )}

                  <div
                    className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${step.bg}`}
                  >
                    <Icon className={step.color} size={30} />
                  </div>

                  <h3 className="mt-6 text-center text-xl font-semibold text-slate-900">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-center leading-7 text-slate-600">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <ArrowRight
                    className="hidden lg:block text-slate-400"
                    size={32}
                  />
                )}
              </>
            );
          })}
        </div>

        {/* Outcome */}

        <div className="mt-20 rounded-3xl bg-emerald-600 p-10 text-center text-white">

          <Leaf size={40} className="mx-auto" />

          <h3 className="mt-4 text-3xl font-bold">
            Better Meals Through Better Feedback
          </h3>

          <p className="mx-auto mt-4 max-w-3xl text-emerald-100 leading-8">
            Every meal, every feedback, and every insight contributes to
            improving the campus dining experience while reducing food
            wastage.
          </p>

        </div>

      </Container>
    </section>
  );
}