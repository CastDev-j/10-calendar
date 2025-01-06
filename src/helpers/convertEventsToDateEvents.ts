import { parseISO } from "date-fns";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const convertEventsToDateEvents = (events: any) => {
  return events.map((event: { start: string; end: string, 
    user: { _id: string; };
  }) => ({
    ...event,
    start: parseISO(event.start),
    end: parseISO(event.end),
    user: {
        ...event.user,
        uid: event.user._id,
    },
  }));
};
