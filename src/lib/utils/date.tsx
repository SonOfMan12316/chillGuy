import { useEffect, useState } from "react";
import Github from "../../components/icon/github";

const useFormattedDayAndTime = () => {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    const updateDayAndTime = () => {
      const dayAbbreviations = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thur",
        "Fri",
        "Sat",
      ];
      const date = new Date();
      const hour = date.getHours();
      const minute = date.getMinutes().toString().padStart(2, "0");
      const dayAbbreviation = dayAbbreviations[date.getDay()];
      const ampm = hour >= 12 ? "PM" : "AM";

      setFormattedDate(`${dayAbbreviation} ${hour}:${minute} ${ampm}`);
    };

    updateDayAndTime();
    const interval = setInterval(updateDayAndTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-around py-8">
      <div className="currentTime  uppercase">{formattedDate}</div>
      <Github />
    </div>
  );
};

export default useFormattedDayAndTime;
