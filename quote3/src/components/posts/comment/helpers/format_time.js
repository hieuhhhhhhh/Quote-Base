// useFormattedDate.js
import { useEffect } from "react";

const useFormat = (birthTime, setFtime) => {
  useEffect(() => {
    if (birthTime) {
      const date = new Date(birthTime);

      // Format time to "h:mm AM/PM"
      const timeOptions = {
        hour: "numeric",
        minute: "numeric",
        hour12: true, // Use 12-hour format
      };
      const formattedTime = date.toLocaleTimeString(undefined, timeOptions);

      // Format the date to "Month Day, Year"
      const dateOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
      };
      const formattedDateString = date.toLocaleDateString(
        undefined,
        dateOptions
      );

      // Combine time and date
      setFtime(`${formattedTime} ${formattedDateString}`);
    }
  }, [birthTime]); // Re-run effect if birth_time changes
};

export default useFormat;
