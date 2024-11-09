import { SigninRight } from "../../component/auth_component/SigninRight";
import { SignUpLeft } from "../../component/auth_component/SignupLeft";

export function SignUpPage() {
  return (
    <div className="h-screen flex">
      <div className="w-[50%] flex items-center justify-center">
        <SignUpLeft />
      </div>
      <div className="w-[50%]">
        <SigninRight />
      </div>
    </div>
  );
}
