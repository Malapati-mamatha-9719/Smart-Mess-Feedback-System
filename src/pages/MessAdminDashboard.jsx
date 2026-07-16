import Navbar from "../components/layout/Navbar";
import Adminstats from "../components/admin/Adminstats";
import MenuForm from "../components/admin/MenuForm";
import WastageForm from "../components/admin/WastageForm";
export default function MessAdminDashboard() {
  return (
    <>
      <Navbar />

      <section className="bg-slate-50 min-h-screen pt-28 pb-12">
        <div className="container-custom">

          {/* Header */}

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Mess Admin Dashboard
            </h1>

            <p className="mt-2 text-slate-600">
              Manage menus, record food wastage and monitor feedback.
            </p>
          </div>

          {/* Main Content */}

          <div className="mt-10 grid gap-6">

            {/* Menu Form */}

            <MenuForm />

            {/* Wastage */}

            <WastageForm />

            {/* Analytics */}

           <Adminstats />

          </div>

        </div>
      </section>
    </>
  );
}