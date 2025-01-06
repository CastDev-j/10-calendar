//@ts-expect-error This doesn't recognize the type
export const CalendarEventBox = ({ event }) => {
  const { title, user } = event;

  return (
    <>
      <strong>{title}</strong>
      <span> - {user.name}</span>
    </>
  );
};
