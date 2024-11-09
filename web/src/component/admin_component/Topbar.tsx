import { useNavigate } from "react-router-dom";

export function AdminTopbar() {
  const navigate = useNavigate();

  return (
    <div className="px-20 py-10 w-[100%]">
      <div className="flex justify-between py-5">
        <p className="text-slate-300 font-bold text-3xl">Admin Panel</p>
        <div
          onClick={() => {
            navigate("/admin/add/event");
          }}
          className="py-2 px-4 bg-slate-200 rounded-lg hover:cursor-pointer"
        >
          <p className="text-md">+ Add Event</p>
        </div>
      </div>
    </div>
  );
}
