import { useCalendarStore } from "../../hooks/useCalendarStore";
import { useUiStore } from "../../hooks/useUiStore";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();
  const { isDateModalOpen } = useUiStore();

  const handleClickDelete = () => {
    startDeletingEvent();
  };

  return (!hasEventSelected || isDateModalOpen) ? null : (
    <button className="btn btn-danger fab-danger" onClick={handleClickDelete}>
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
