import { useNavigate } from "react-router-dom";

export function UserTopBar() {
  const navigate = useNavigate();

  return (
    <div className="px-20 py-10 w-[100%]">
      <div className="flex justify-between py-5">
        <p className="text-slate-300 font-bold text-3xl">Hey, User !</p>
      </div>
    </div>
  );
}
