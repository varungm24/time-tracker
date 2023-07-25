import React, { useEffect, useRef } from "react";
import { Calendar } from "@fullcalendar/core";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const MyCalendar: React.FC = (props: any) => {
  const { allTimeLogs, handleAddTime, handleEditTime } = props;
  const calendarRef = useRef<HTMLDivElement>(null);
  const updatedTimeLog = allTimeLogs?.map((item: any) => ({
    ...item,
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
      selectMirror: true,
      selectable: true, // Enable selection on the calendar
      events: updatedTimeLog,
      select: handleAddTime, // Add the select callback function here
      editable: true,
      eventClick: function (info) {
        // Handle event click here to open edit modal/form
        const event = info.event;
        handleEditTime(event);
      },
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, [updatedTimeLog]);

  return <div ref={calendarRef} />;
};

export default MyCalendar;
