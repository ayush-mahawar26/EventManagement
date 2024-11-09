import { jwtDecode } from "jwt-decode";
import {
  CustomButton,
  LoadingButton,
} from "../../../component/util_component/CustomButtonComponent";
import { CustomformatDate } from "../../../utils/Formatdate";
import { DecodedToken } from "../../../utils/CustomInterfaces";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseurl } from "../../../constants";
import { useRecoilState } from "recoil";
import {
  loadingAtom,
  messageAtom,
  openSnackbarAtom,
} from "../../../atoms/utilsatom";

export function UserEventCard({ event }: { event: any }) {
  const [contain, setContain] = useState(false);
  const [len, setLen] = useState(0);
  const [loading, setLoading] = useRecoilState(loadingAtom);

  async function checkContain() {
    const user = jwtDecode<DecodedToken>(localStorage.getItem("token")!);
    const userid = user.id;
    const eventid = event._id;
    console.log(eventid);
    console.log(userid);

    try {
      const res = await axios.get(
        baseurl + `/event/contain/${eventid}/${userid}`
      );

      if (res.data.statusCode > 200) {
        return;
      }

      setContain(res.data.data.contain);
      setLen(res.data.data.len);
    } catch (error) {
      throw error;
    }
  }

  async function applyInEvent() {
    setLoading(true);
    try {
      const res = await axios.post(
        baseurl + `/event/add/${event._id}`,
        {},
        { headers: { Authorization: localStorage.getItem("token") } }
      );

      if (res.data.statusCode > 200) {
        setLoading(false);
        return;
      }
      setLoading(false);
      setContain((contain) => !contain);
      setLen((len) => len + 1);
    } catch (error) {
      setLoading(false);

      throw error;
    }
  }

  useEffect(() => {
    checkContain();
  }, []);

  return (
    <div className="text-slate-700">
      <div
        className="shadow-md bg-sec-text my-3 mx-2 rounded-md hover:cursor-pointer w-[] bg-slate-400"
        onClick={() => {}}
      >
        <p className="px-4 py-2 font-semibold text-2xl">{event.title}</p>
        <p className="px-4 font-medium text-xl">{event.description}</p>
        <div className="flex justify-between px-4 pu-3">
          <div className="w-[100%] flex justify-between">
            <p className="text-slate-800 font-medium">Event on</p>
            <p className="text-sm text-slate-500 font-semibold">
              {CustomformatDate(event.date)}
            </p>
          </div>
        </div>
        <div className="flex justify-between px-4 pu-3 pb-2">
          <p className="text-slate-800 font-medium">Participants</p>
          <p className="text-sm text-slate-500 font-semibold">{len}</p>
        </div>
        <div className="mx-2">
          {contain === false ? (
            loading === true ? (
              <LoadingButton size="" />
            ) : (
              <CustomButton
                title="Apply"
                onTap={() => {
                  applyInEvent();
                }}
              />
            )
          ) : (
            <CustomButton title="Applied" onTap={() => {}} />
          )}
        </div>
      </div>
    </div>
  );
}
// text-sm text-slate-500
