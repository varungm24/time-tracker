import React, { useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const MyCalendar: React.FC = (props: any) => {
  const { allTimeLogs } = props;
  const calendarRef = useRef<HTMLDivElement>(null);
  const updatedTimeLog = allTimeLogs?.map((item: any) => ({
    ...item,
    ["display"]: "background",
  }));

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
      events: updatedTimeLog,
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, [updatedTimeLog]);

  return <div ref={calendarRef} />;
};

export default MyCalendar;
