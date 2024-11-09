import { SignInLeft } from "../../component/auth_component/SigninLeft";
import { SigninRight } from "../../component/auth_component/SigninRight";

export function SigninPage() {
  return (
    <div className="h-screen flex">
      <div className="w-[50%] flex items-center justify-center">
        <SignInLeft />
      </div>
      <div className="w-[50%]">
        <SigninRight />
      </div>
    </div>
  );
}
