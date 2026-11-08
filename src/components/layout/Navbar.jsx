import { useEffect, useState } from "react";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import Button from "../common/Button";
import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Re-check login state whenever the navbar mounts (e.g. after navigating to a new page)
    setIsLoggedIn(!!localStorage.getItem("token"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const navLinks = [
    { label: "Home", id: "home" },
    { label: "Why it Matters", id: "challenges" },
    { label: "How It Works", id: "how-it-works" },
  ];

  const scrollToSection = (id) => {
    setMobileOpen(false);

    // If we're not on the home page, go there first, then scroll
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
      return;
    }

    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container-custom h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-emerald-600 p-2 rounded-xl text-white">
            <UtensilsCrossed size={24} />
          </div>
          <div>
            <h1 className="font-bold text-xl text-slate-800">Smart Mess Feedback</h1>
            <p className="text-xs text-slate-500">Better Meals. Less Waste.</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-slate-600 hover:text-emerald-600 transition-colors font-medium"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <Button onClick={handleLogout}>Logout</Button>
          ) : (
            <Button onClick={() => navigate("/login")}>Login</Button>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col px-6 py-5 gap-5">
            {navLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-slate-700 font-medium text-left"
              >
                {item.label}
              </button>
            ))}
            {isLoggedIn ? (
              <Button onClick={handleLogout}>Logout</Button>
            ) : (
              <Button onClick={() => navigate("/login")}>Login</Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
