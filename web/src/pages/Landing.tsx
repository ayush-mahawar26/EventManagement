import { useNavigate } from "react-router-dom";
import { ReactTyped } from "react-typed";
import { CustomButton } from "../component/util_component/CustomButtonComponent";

export function LandingPage() {
  const nav = useNavigate();

  return (
    <div className="">
      <LandingPageAppBar />
      <div className="flex flex-col justify-center items-center my-20">
        <p className="text-6xl font-semibold">Manage Event</p>
        <ReactTyped
          className="text-3xl font-semibold py-4"
          strings={["Participate", "Win Prizes", "Succeed"]}
          typeSpeed={150}
          backSpeed={100}
          loop
        />
        <div className="flex justify-center items-center  md:invisible">
          <div className="px-2">
            <CustomButton
              onTap={() => {
                nav("/user/signin", { replace: true });
              }}
              title="Sign In"
            />
          </div>
          <div>
            <CustomButton
              onTap={() => {
                nav("/user/signup", { replace: true });
              }}
              title="Sign up"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingPageButton({
  title,
  onTap,
}: {
  title: string;
  onTap: Function;
}) {
  return (
    <div className="py-3">
      <button
        type="button"
        className="w-[100%] bg-white text-gray-800 font-semibold hover:bg-gray-300  rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        onClick={() => {
          onTap();
        }}
      >
        {title}
      </button>
    </div>
  );
}

function LandingPageAppBar() {
  const nav = useNavigate();
  return (
    <div className="flex items-center justify-center bg-slate-900">
      <div className="flex items-center justify-between w-[80%]">
        <p className="font-semibold text-3xl flex flex-col items-center justify-center text-slate-200">
          EManage.io
        </p>
        <div className="flex justify-center items-center invisible md:visible">
          <div className="px-2">
            <LandingPageButton
              onTap={() => {
                nav("/user/signin", { replace: true });
              }}
              title="Sign In"
            />
          </div>
          <div>
            <LandingPageButton
              onTap={() => {
                nav("/user/signup", { replace: true });
              }}
              title="Sign up"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
