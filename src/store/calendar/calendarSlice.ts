import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  id: new Date().getTime(),
  title: "Mi cumpleaños",
  notes: "Es mi cumpleaños",
  start: new Date(0),
  end: addHours(new Date(0), 24),
  bgColor: "#343a40",
  user: {
    _id: "123",
    name: "Andres",
  },
};

const initialState = {
  isLoadingEvents: false,
  events: [tempEvent],
  activeEvent: null,
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    onSetActiveEvent: (state, action) => {
      state.activeEvent = action.payload;
    },

    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },

    onUpdatedEvent: (state, { payload }) => {
      state.events = state.events.map((event) =>
        event.id === payload.id ? payload : event
      );
    },

    onDeletedEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          // @ts-expect-error type not defined
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },

    onLoadEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      payload.forEach((event: any) => {
        const exists = state.events.some((e) => e.id === event.id);

        if (!exists) {
          state.events.push(event);
        }
      });
    },

    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [tempEvent];
      state.activeEvent = null;
    }
  },
});

export const {
  onAddNewEvent,
  onDeletedEvent,
  onLoadEvents,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdatedEvent,
} = calendarSlice.actions;
