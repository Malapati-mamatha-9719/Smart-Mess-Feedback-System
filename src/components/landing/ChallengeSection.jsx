import {
  ClipboardList,
  Soup,
  Trash2,
  BarChart3,
} from "lucide-react";

import Container from "../layout/Container";
import SectionTitle from "../common/SectionTitle";

const challenges = [
  {
    icon: ClipboardList,
    title: "Paper-based Feedback",
    description:
      "Traditional feedback methods are slow, difficult to organize, and often ignored.",
  },
  {
    icon: Soup,
    title: "Repetitive Menus",
    description:
      "Without structured feedback, the same meals are repeated despite changing student preferences.",
  },
  {
    icon: Trash2,
    title: "Food Wastage",
    description:
      "Messes often lack accurate records to identify where food waste occurs.",
  },
  {
    icon: BarChart3,
    title: "Lack of Insights",
    description:
      "Administrators have limited data to make informed decisions and improve dining quality.",
  },
];

export default function ChallengeSection() {
  return (
    <section
      id="challenges"
      className="bg-white py-16"
    >
      <Container>

        <SectionTitle
          badge="The Challenge"
          title="Why Campus Dining Needs a Better Feedback System"
          description="Traditional mess management often relies on manual processes and delayed feedback, making it difficult to improve meal quality and reduce food wastage."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">

          {challenges.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            );
          })}

        </div>

      </Container>
    </section>
  );
}