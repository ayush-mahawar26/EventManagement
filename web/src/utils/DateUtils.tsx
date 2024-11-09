export function DateUtil({ date }: { date: Date }) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "short", // 'Sun'
    month: "short", // 'Nov'
    day: "numeric", // '10'
    year: "numeric", // '2024'
    hour: "numeric", // '12' (AM/PM formatting)
    minute: "2-digit", // '30'
    hour12: true, // Enable 12-hour clock
  }).format(date);

  return <p>{formattedDate}</p>;
}
