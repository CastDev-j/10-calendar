import "react-big-calendar/lib/css/react-big-calendar.css";
import { Navbar } from "../components/Navbar";
import { Calendar } from "react-big-calendar";
import { localizer } from "../../helpers/calendarLocalizer";
import { getMessagesEs } from "../../helpers/getMessages";
import { CalendarEventBox } from "../components/CalendarEventBox";
import { useEffect, useState } from "react";
import { CalendarModal } from "../components/CalendarModal";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";
import { useAuthStore } from "../../hooks/useAuthStore";

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();
  const { activeEvent } = useCalendarStore();
  const { user } = useAuthStore();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const eventStyleGetter = (event: any) => {

    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "0px",
      opacity: 1,
      display: "block",
      color: "white",
    };

    if (user.uid !== event.user.uid ) {
      style.backgroundColor = "#465660";
    }
    
    if (event.id === activeEvent?.id) {
      style.backgroundColor = "#619aff";
      style.color = "white";
    }

    return { style };
  };

  const onDoubleClick = () => {
    openDateModal();
  };

  const onSelect = (e: unknown) => {
    setActiveEvent(e);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onViewChanged = (e: any) => {
    localStorage.setItem("lastView", e);
    setLastView(e);
  };

  useEffect(() => {
    startLoadingEvents();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Navbar />

      <Calendar
        defaultView={lastView as "month" | "week" | "day" | "agenda"}
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesEs()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEventBox,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
