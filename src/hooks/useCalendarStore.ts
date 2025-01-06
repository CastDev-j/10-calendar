import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeletedEvent,
  onSetActiveEvent,
  onUpdatedEvent,
  onLoadEvents,
} from "../store/calendar/calendarSlice";
import calendarApi from "../api/calendarApi";
import { convertEventsToDateEvents } from "../helpers/convertEventsToDateEvents";
import Swal from "sweetalert2";

export const useCalendarStore = () => {
  // @ts-expect-error type not defined
  const { user } = useSelector((state) => state.auth);

  //@ts-expect-error type not defined
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setActiveEvent = (calendarEvent: any) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const startSavingEvent = async (calendarEvent: any) => {
    try {
      if (calendarEvent.id) {
        // actualizar
        await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent);
        dispatch(onUpdatedEvent({ ...calendarEvent, user }));

        return;
      }
      // creando

      const { data } = await calendarApi.post("/events", calendarEvent);

      dispatch(
        onAddNewEvent({ ...calendarEvent, id: data.data.event.id, user })
      );

      return;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire("Error", error.response.data.msg, "error");
    }
  };

  const startDeletingEvent = async () => {
    //TODO implement backend
    console.log(activeEvent);
    
    try {
      await calendarApi.delete(`/events/${activeEvent.id}`);
      dispatch(onDeletedEvent());
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire("Error", error.response.data.msg, "error");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");

      const events = convertEventsToDateEvents(data.data.events);

      dispatch(onLoadEvents(events));
    } catch (error) {
      console.log(error);
    }
  };

  return {
    //* properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* methods
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
    startLoadingEvents,
  };
};
