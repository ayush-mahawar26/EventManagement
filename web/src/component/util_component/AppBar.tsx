import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../utils/CustomInterfaces";
import { CustomButton } from "./CustomButtonComponent";
import { useNavigate } from "react-router-dom";

export function AppBar() {
  const navigate = useNavigate();
  const user = jwtDecode<DecodedToken>(localStorage.getItem("token")!);
  const id = user.email;

  const firstTwo = id?.substring(0, 2).toUpperCase();
  return (
    <div className="bg-slate-800">
      <div className="flex justify-between px-20 py-5 items-center">
        <div className="text-slate-100 text-xl font-semibold">
          EventManagement
        </div>

        <div className="flex justify-center items-center">
          <div className="text-slate-100 rounded-full bg-slate-600 px-1 mx-2">
            <p className="p-2">{firstTwo}</p>
          </div>
          <CustomButton
            title="Logout"
            onTap={() => {
              localStorage.removeItem("token");
              navigate("/user/signin");
            }}
          />
        </div>
      </div>
      <hr className="h-0.5 border-t-0 bg-neutral-100 dark:bg-white/10" />
    </div>
  );
}
