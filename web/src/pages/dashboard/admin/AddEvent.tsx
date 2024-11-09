import { useState } from "react";
import { AppBar } from "../../../component/util_component/AppBar";
import {
  EntryBoxComponent,
  MultiLineEntryBoxComponent,
} from "../../../component/util_component/EntryBoxComponent";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  CustomButton,
  LoadingButton,
} from "../../../component/util_component/CustomButtonComponent";
import { useRecoilState } from "recoil";
import {
  loadingAtom,
  messageAtom,
  openSnackbarAtom,
} from "../../../atoms/utilsatom";
import axios from "axios";
import { baseurl } from "../../../constants";
import { DateUtil } from "../../../utils/DateUtils";
import { useNavigate } from "react-router-dom";

export function AddEvent() {
  return (
    <div className="min-h-screen">
      <AppBar />
      <div className="flex flex-col justify-center items-center h-[100%]">
        <FormForEvent />
      </div>
    </div>
  );
}

function FormForEvent() {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setDescription] = useState("");
  const [eventLocation, setLocation] = useState("");
  const [eventDate, setEventDate] = useState(new Date());

  const [loading, setLoading] = useRecoilState(loadingAtom);
  const navigate = useNavigate();

  async function createEvent() {
    const body = {
      title: eventName,
      location: eventLocation,
      description: eventDescription,
      date: eventDate,
    };
    setLoading(true);
    try {
      const res = await axios.post(baseurl + "/event/new", body, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      navigate("/admin/dashboard");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  return (
    <div className="w-[30%] py-10">
      <EntryBoxComponent title="Event Name" type="text" value={setEventName} />
      <MultiLineEntryBoxComponent
        title="Description of event"
        value={setDescription}
        hint="Describe you event"
      />
      <EntryBoxComponent
        title="Location of Event"
        type="text"
        value={setLocation}
      />
      <div className="flex justify-between py-2">
        <p className="font-medium">Date of event</p>
        <div className="py-1">
          <DatePicker
            selected={eventDate}
            onChange={(date) => setEventDate(date!)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select a date"
            showTimeSelect
            minDate={new Date()}
          />
        </div>
      </div>
      <div className="flex justify-center">
        <DateUtil date={eventDate} />
      </div>

      <div>
        {loading === true ? (
          <LoadingButton size="w-[100%]" />
        ) : (
          <CustomButton
            title="Create Event"
            onTap={() => {
              createEvent();
            }}
          />
        )}
      </div>
    </div>
  );
}
