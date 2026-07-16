import { useState } from "react";

import Navbar from "../components/layout/Navbar";
import Container from "../components/layout/Container";
import RoleSelector from "../components/login/RoleSelector";


export default function Login() {
const [selectedRole, setSelectedRole] = useState(null);

  return (
    <>
      <Navbar />

      <section className="bg-slate-50 py-24 min-h-screen">
        <Container>

          <div className="mx-auto max-w-5xl">

            <div className="text-center">

              <h1 className="text-5xl font-bold text-slate-900">
                Welcome Back
              </h1>

              <p className="mt-5 text-lg text-slate-600">
                Select your role to continue.
              </p>

            </div>

            <div className="mt-16">
              <RoleSelector
                
              />
            </div>

            {selectedRole && (
              <div className="mt-14">
                <LoginForm role={selectedRole} />
              </div>
            )}

          </div>

        </Container>
      </section>
    </>
  );
}