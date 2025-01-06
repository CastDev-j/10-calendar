import { createSlice } from "@reduxjs/toolkit";
import { addHours } from "date-fns";

const tempEvent = {
  _id: new Date().getTime(),
  title: "Mi cumpleaños",
  notes: "Es mi cumpleaños",
  start: new Date(),
  end: addHours(new Date(), 24),
  bgColor: "#343a40",
  user: {
    _id: "123",
    name: "Andres",
  },
};

const initialState = {
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
        event._id === payload._id ? payload : event
      );
    },

    onDeletedEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          // @ts-expect-error type not defined
          (event) => event._id !== state.activeEvent._id
        );
        state.activeEvent = null;
      }
    },
  },
});

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdatedEvent,
  onDeletedEvent,
} = calendarSlice.actions;
