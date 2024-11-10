import { SignInLeft } from "../../component/auth_component/SigninLeft";
import { SigninRight } from "../../component/auth_component/SigninRight";

export function SigninPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen md:flex-row md:h-screen">
      <div className="w-full md:w-[50%] flex flex-col items-center justify-center">
        <SignInLeft />
      </div>
      <div className="hidden md:flex md:flex-col md:w-[50%]">
        <SigninRight />
      </div>
    </div>
  );
}
