import React, { useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const MyCalendar: React.FC = () => {
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calendar = new Calendar(calendarRef.current!, {
      plugins: [timeGridPlugin, interactionPlugin],
      initialView: "timeGridWeek",
      headerToolbar: {
        left: "prev,next today",
        center: "title",
        right: "timeGridWeek,timeGridDay",
      },
      selectable: true,
      selectOverlap: function(event) {
        return alert("Cannot select the occupied slots");
      },
      events: [
        {
          start: "2023-07-20T10:00:00",
          end: "2023-07-20T16:20:00",
          display: "background",
        },
      ],
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, []);

  return <div ref={calendarRef} />;
};

export default MyCalendar;
