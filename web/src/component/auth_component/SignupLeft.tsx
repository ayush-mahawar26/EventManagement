import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { loadingAtom, openSnackbarAtom, roleAtom } from "../../atoms/utilsatom";
import { EntryBoxComponent } from "../util_component/EntryBoxComponent";
import {
  CustomButton,
  LoadingButton,
} from "../util_component/CustomButtonComponent";
import { CustomSnackbar } from "../util_component/Snackbar";
import axios from "axios";
import { baseurl } from "../../constants";
import { RoleDropDown } from "./RoleDropdown";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  admin?: Boolean;
  email?: string;
  exp?: number;
}

export function SignUpLeft() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useRecoilState(openSnackbarAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const role = useRecoilValue(roleAtom);
  const [errorMessage, setErrorMessage] = useState("");

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

  async function onSignUp() {
    setLoading(true);
    if (username === "" || email === "" || password === "") {
      setErrorMessage("Empty Feilds");
      setOpen(true);
      setLoading(false);
      return;
    }

    const body = {
      name: username,
      email,
      password,
      isAdmin: role === "Admin" ? true : false,
    };

    try {
      console.log(body);

      const res = await axios.post(baseurl + "/user/signup", body);

      if (res.data.statusCode > 200) {
        setErrorMessage(res.data.message);
        setOpen(true);
        setLoading(false);
        return;
      }

      const token = res.data.data.token;
      localStorage.setItem("token", token);
      setLoading(false);

      if (role === "User") {
        navigate("/user/dashboard", { replace: true });
      } else {
        navigate("/admin/dashboard", { replace: true });
      }
    } catch (err) {
      setLoading(false);
    }
  }

  return (
    <div className="w-[50%]">
      <h1 className="font-medium text-2xl">Welcome</h1>
      <p className="text-sec-text py-2">Create your account</p>
      <div className="py-2">
        <EntryBoxComponent value={setUsername} title="Username" type="text" />
      </div>
      <div className="py-2">
        <EntryBoxComponent title="Email" type="text" value={setEmail} />
      </div>
      <div className="py-2">
        <EntryBoxComponent
          title="Password"
          type="password"
          value={setPassword}
        />
      </div>
      <div>
        <RoleDropDown />
      </div>
      {loading === false ? (
        <CustomButton
          onTap={() => {
            onSignUp();
          }}
          title="Sign up"
        />
      ) : (
        <LoadingButton size="w-[100%]" />
      )}
      <div className="flex justify-center">
        <p>Already have account ? </p>
        <p
          className="font-semibold px-1 hover:cursor-pointer"
          onClick={() => {
            navigate("/user/signin", { replace: true });
          }}
        >
          Sign In
        </p>
      </div>
      <CustomSnackbar open={open} openState={setOpen} message={errorMessage} />
    </div>
  );
}
