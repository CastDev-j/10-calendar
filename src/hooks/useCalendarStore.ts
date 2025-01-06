import { useDispatch, useSelector } from "react-redux";
import {
  onAddNewEvent,
  onDeletedEvent,
  onSetActiveEvent,
  onUpdatedEvent,
} from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {
  //@ts-expect-error type not defined
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setActiveEvent = (calendarEvent: any) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const startSavingEvent = async (calendarEvent: any) => {
    //TODO implement backend

    // todo bien
    if (calendarEvent._id) {
      // actualizar
      dispatch(onUpdatedEvent({ ...calendarEvent }));
    } else {
      // creando
      dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
    }
  };

  const startDeletingEvent = async () => {
    //TODO implement backend

    dispatch(onDeletedEvent());
  }

  return {
    //* properties
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    //* methods
    startDeletingEvent,
    setActiveEvent,
    startSavingEvent,
  };
};
