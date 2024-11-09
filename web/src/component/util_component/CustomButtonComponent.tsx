export function CustomButton({
  title,
  onTap,
}: {
  title: string;
  onTap: Function;
}) {
  return (
    <div className="py-3">
      <button
        type="button"
        className="w-[100%] text-white bg-gray-800 hover:bg-gray-900  rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        onClick={() => {
          onTap();
        }}
      >
        {title}
      </button>
    </div>
  );
}

export function LoadingButton({ size }: { size: string }) {
  return (
    <button
      type="button"
      className={`${size} text-white bg-gray-800 hover:bg-gray-900 rounded-lg text-sm px-5 py-2.5 me-2 my-2 flex items-center justify-center`}
    >
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v8H4z"
        />
      </svg>
    </button>
  );
}
