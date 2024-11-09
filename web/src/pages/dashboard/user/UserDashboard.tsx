import axios from "axios";
import { AdminTopbar } from "../../../component/admin_component/Topbar";
import { AppBar } from "../../../component/util_component/AppBar";
import { baseurl } from "../../../constants";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  loadingAtom,
  messageAtom,
  openSnackbarAtom,
} from "../../../atoms/utilsatom";
import { CustomSnackbar } from "../../../component/util_component/Snackbar";
import { EventCard } from "../../../component/admin_component/EventCard";
import { EventCardShimmer } from "../../../component/admin_component/ShimmerEventCard";
import { jwtDecode } from "jwt-decode";
import { DecodedToken } from "../../../utils/CustomInterfaces";
import { UserTopBar } from "../../../component/user_component/UserTopBar";
import { UserEventCard } from "../../../component/user_component/Eventusercard";

export function UserDashBoard() {
  const [event, setEvent] = useState([]);

  const [open, setOpen] = useRecoilState(openSnackbarAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const [mssg, setMssg] = useRecoilState(messageAtom);

  async function getEvents() {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const userid = jwtDecode<DecodedToken>(token!);
      console.log(userid.id);

      const res = await axios.get(baseurl + `/event`);
      if (res.data.statusCode > 200) {
        setMssg(res.data.message);
        setOpen(true);
        setLoading(false);
        return;
      }
      setLoading(false);
      console.log(res);

      setEvent(res.data.data.events);
    } catch (error) {
      setLoading(false);
      throw error;
    }
  }

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="bg-slate-800 min-h-screen">
      <AppBar />
      <UserTopBar />
      <div className="flex px-20">
        {loading === true ? (
          <EventCardShimmer />
        ) : (
          <div className="w-[100%] grid grid-cols-3 gap-4">
            {event.map((item) => {
              return (
                <div key={item["id"]} className="text-slate-50 px-2">
                  <UserEventCard event={item} />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <CustomSnackbar open={open} message={mssg} openState={setOpen} />
    </div>
  );
}
