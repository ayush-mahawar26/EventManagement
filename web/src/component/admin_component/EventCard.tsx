import { useNavigate } from "react-router-dom";
import { CustomformatDate } from "../../utils/Formatdate";

export function EventCard({ event }: { event: any }) {
  const nav = useNavigate();

  // console.log(event.attendees.length());

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
          <p className="text-sm text-slate-500 font-semibold">
            {event.attendees.length}
          </p>
        </div>
      </div>
    </div>
  );
}
// text-sm text-slate-500
