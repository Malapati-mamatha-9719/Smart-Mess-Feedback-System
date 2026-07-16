import Navbar from "../components/layout/Navbar";
import Hero from "../components/landing/Hero";
import ChallengeSection from "../components/landing/ChallengeSection";
import HowItWorks from "../components/landing/HowItworks";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ChallengeSection />
      <HowItWorks />
    </>
  );
}