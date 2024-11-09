import { Dispatch, SetStateAction } from "react";

export function EntryBoxComponent({
  title,
  type,
  value,
}: {
  title: string;
  type: string;
  value: Dispatch<SetStateAction<string>>;
}) {
  return (
    <div>
      <p className="font-medium">{title}</p>

      <div className="py-1">
        <input
          onChange={(e) => {
            value(e.target.value);
          }}
          type={type}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5"
          placeholder={title}
          required
        />
      </div>
    </div>
  );
}

export function MultiLineEntryBoxComponent({
  title,
  value,
  hint,
}: {
  title: string;
  value: Dispatch<SetStateAction<string>>;
  hint: string;
}) {
  return (
    <div>
      <p className="font-medium">{title}</p>

      <div className="py-1">
        <textarea
          id="message"
          onChange={(e) => {
            value(e.target.value);
          }}
          rows={5}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
          placeholder={hint}
        ></textarea>
      </div>
    </div>
  );
}
