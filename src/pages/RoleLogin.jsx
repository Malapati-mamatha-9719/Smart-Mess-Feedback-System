import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

import Navbar from "../components/layout/Navbar";
import Button from "../components/common/Button";

const API_BASE_URL = "http://127.0.0.1:8000";

// Frontend role slugs (used in URLs) -> backend role values, and where to send each role after login
const ROLE_CONFIG = {
  "student": { backendRole: "student", dashboardPath: "/student-dashboard" },
  "mess-admin": { backendRole: "admin", dashboardPath: "/mess-admin-dashboard" },
  "higher-admin": { backendRole: "higher_admin", dashboardPath: "/higher-admin-dashboard" },
};

export default function RoleLogin() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const roleName = role
    ?.split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");

  const roleConfig = ROLE_CONFIG[role];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!roleConfig) {
      setError("Unknown role. Please go back and pick a valid option.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        setError("Incorrect email or password.");
        return;
      }

      const data = await response.json();

      if (data.role !== roleConfig.backendRole) {
        setError(
          `This account isn't registered as ${roleName}. Please use the correct login page for your role.`
        );
        return;
      }

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role", data.role);

      navigate(roleConfig.dashboardPath);
    } catch (err) {
      setError("Could not reach the server. Please make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-slate-50 pt-22 pb-20">

        <div className="max-w-md mx-auto">

          <button
            onClick={() =>
              navigate("/login")
            }
            className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 mb-6"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-lg p-8">

            <div className="text-center">

              <div className="inline-flex px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium">
                {roleName}
              </div>

              <h1 className="mt-5 text-3xl font-bold text-slate-900">
                Welcome Back
              </h1>

              <p className="mt-3 text-slate-500">
                Login using your registered credentials.
              </p>

            </div>

            <form
              onSubmit={handleLogin}
              className="mt-8 space-y-5"
            >

              <div>

                <label className="block mb-2 font-medium text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />

              </div>

              <div>

                <label className="block mb-2 font-medium text-slate-700">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>

              {error && (
                <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

            </form>

            <div className="mt-6 rounded-xl bg-slate-50 p-4 border border-slate-200">

              <p className="text-sm text-slate-600 text-center">
                Access is restricted to
                authorized students and
                administrators.
              </p>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}
