export function EventCardShimmer() {
  return (
    <div className="shadow-md bg-sec-text my-3 mx-2 rounded-md hover:cursor-pointer w-[33%] bg-slate-400 animate-pulse">
      <div className="h-8 bg-gray-300 rounded px-4 my-2 mx-2"></div>
      <div className="h-6 bg-gray-300 rounded px-4 mb-2"></div>{" "}
      <div className="flex justify-between px-4 pu-3">
        <div className="w-[100%] flex justify-between items-center">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>{" "}
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>{" "}
        </div>
      </div>
      <div className="flex justify-between px-4 pu-3 pb-2">
        <div className="h-4 bg-gray-300 rounded w-1/4"></div>{" "}
        <div className="h-4 bg-gray-300 rounded w-1/6"></div>{" "}
      </div>
    </div>
  );
}
