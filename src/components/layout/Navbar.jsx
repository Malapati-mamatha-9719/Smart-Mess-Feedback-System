import { useEffect, useState } from "react";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import Button from "../common/Button";
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    "Home",
    "Features",
    "How It Works",
    "About",
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom h-20 flex items-center justify-between">

        {/* Logo */}

        <div className="flex items-center gap-3">

          <div className="bg-emerald-600 p-2 rounded-xl text-white">

            <UtensilsCrossed size={22} />

          </div>

          <div>

            <h1 className="font-bold text-xl text-slate-800">
              Smart Mess Feedback
            </h1>

            <p className="text-xs text-slate-500">
              Better Meals. Less Waste.
            </p>

          </div>

        </div>

        {/* Desktop Navigation */}

        <nav className="hidden md:flex gap-8">

          {navLinks.map((item) => (

            <a
              key={item}
              href="#"
              className="text-slate-600 hover:text-emerald-600 transition-colors font-medium"
            >
              {item}
            </a>

          ))}

        </nav>

        {/* Desktop Button */}

        <div className="hidden md:block">

          <Button onClick={() => navigate("/login")}>

            Login

          </Button>

        </div>

        {/* Mobile */}

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

      </div>

      {/* Mobile Menu */}

      {mobileOpen && (

        <div className="md:hidden bg-white shadow-lg">

          <div className="flex flex-col px-6 py-5 gap-5">

            {navLinks.map((item) => (

              <a
                key={item}
                href="#"
                className="text-slate-700 font-medium"
              >
                {item}
              </a>

            ))}

            <Button>

              Login

            </Button>

          </div>

        </div>

      )}

    </header>
  );
}