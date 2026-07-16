import { roles } from "../../mockdata/roles";
import {useNavigate} from "react-router-dom";
export default function RoleSelector(){

  const navigate = useNavigate();
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {roles.map((role) => {
        const Icon = role.icon;

        return (
          <button
      key={role.id}
      onClick={() => navigate(`/login/${role.id}`)}
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        text-left
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        hover:border-emerald-400
        cursor-pointer
      "
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
        <Icon
          size={28}
          className="text-emerald-600"
        />
      </div>

      <h3 className="mt-5 text-xl font-semibold">
        {role.title}
      </h3>

      <p className="mt-3 text-slate-500 leading-7">
        {role.description}
      </p>
    </button>
        );
      })}
    </div>
  );
}