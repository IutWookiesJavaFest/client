import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";

const ProfileCalendar = () => {
  const [date, setDate] = useState(new Date()); // Initializes date to today's date

  return (
    <div>
      <Calendar
        mode="single"
        selected={date} // Uses today's date as the selected date
        onSelect={setDate} // Updates date when a new date is selected
        className="rounded-md border"
      />
    </div>
  );
};

export default ProfileCalendar;
