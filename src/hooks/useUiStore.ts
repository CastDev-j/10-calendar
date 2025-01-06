import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store/ui/iuSlice";

export const useUiStore = () => {
  const dispatch = useDispatch();

  //@ts-expect-error staeType is not defined
  const { isDateModalOpen } = useSelector((state) => state.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  }

  return {
    //* Propiedades
    isDateModalOpen,

    //* Métodos
    openDateModal,
    closeDateModal,
  };
};
