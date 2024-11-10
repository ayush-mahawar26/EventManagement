import { useEffect, useState } from "react";
import { EntryBoxComponent } from "../util_component/EntryBoxComponent";
import { useRecoilState } from "recoil";
import { loadingAtom, openSnackbarAtom } from "../../atoms/utilsatom";
import {
  CustomButton,
  LoadingButton,
} from "../util_component/CustomButtonComponent";
import { CustomSnackbar } from "../util_component/Snackbar";
import { useNavigate } from "react-router-dom";
import { baseurl } from "../../constants";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  admin?: Boolean;
  email?: string;
  exp?: number;
}

export function SignInLeft() {
  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    const user = jwtDecode<DecodedToken>(token!);
    if (user.admin === true) {
      navigate("/admin/dashboard", { replace: true });
    } else {
      navigate("/user/dashboard", { replace: true });
    }
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [open, setOpen] = useRecoilState(openSnackbarAtom);
  const [errorMessage, setErrorMessage] = useState("");

  async function onSignIn() {
    setLoading(true);
    const url = baseurl + "/user/signin";

    const body = {
      email: email,
      password,
    };

    try {
      const res = await axios.post(url, body);
      console.log(res.data);
      console.log(res.data.message);

      if (res.data.statusCode > 200) {
        setErrorMessage(res.data.message);
        setOpen(true);
        setLoading(false);
        return;
      }

      const token = res.data.data.token;
      localStorage.setItem("token", token);

      const user = jwtDecode<DecodedToken>(token);
      setLoading(false);

      if (user.admin === true) {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/user/dashboard", { replace: true });
      }
    } catch (e) {
      // throw e;
      setErrorMessage("Some Error Occured");
      setOpen(true);
      setLoading(false);
    }
  }

  return (
    <div className="md:w-[50%]">
      <h1 className="font-medium text-2xl">Welcome back</h1>
      <p className="text-sec-text py-2">Log in to your account to continue.</p>
      <div className="py-2">
        <EntryBoxComponent value={setEmail} title="Email" type="text" />
      </div>
      <div className="py-2">
        <EntryBoxComponent
          value={setPassword}
          title="Password"
          type="password"
        />
      </div>
      {loading === false ? (
        <CustomButton
          onTap={() => {
            onSignIn();
          }}
          title="Sign in"
        />
      ) : (
        <div className="w-[100%] flex justify-center items-center">
          <LoadingButton size="w-[100%]" />
        </div>
      )}
      <div className="flex justify-center">
        <p>Don't have account? </p>
        <p
          className="font-semibold px-1 hover:cursor-pointer"
          onClick={() => {
            navigate("/user/signup", { replace: true });
          }}
        >
          Create Account
        </p>
      </div>
      <CustomSnackbar message={errorMessage} open={open} openState={setOpen} />
    </div>
  );
}
