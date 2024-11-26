import { useEffect, useState } from "react";

const useFormattedDayAndTime = (): string => {
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

  return formattedDate;
};

export default useFormattedDayAndTime;
