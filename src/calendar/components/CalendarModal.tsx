import "react-datepicker/dist/react-datepicker.css";
import { addHours, differenceInSeconds } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import Modal from "react-modal";
import DatePicker, { registerLocale } from "react-datepicker";
import { es } from "date-fns/locale";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";
import { useUiStore } from "../../hooks/useUiStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";

registerLocale("es", es);

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const {
    isDateModalOpen,
    formValues,
    titleClass,
    onCloseModal,
    onDateChange,
    onInputChange,
    onSubmit,
  } = useCalendarModal();

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label className="mb-2">Fecha y hora inicio</label>
          <br />
          <DatePicker
            onChange={(event) => onDateChange(event, "start")}
            selected={formValues.start}
            className="form-control"
            dateFormat={"Pp"}
            showTimeSelect
            timeCaption="Hora"
            locale="es"
          />
        </div>

        <div className="form-group mb-2">
          <label className="mb-2">Fecha y hora fin</label>
          <br />
          <DatePicker
            minDate={formValues.start}
            onChange={(event) => onDateChange(event, "end")}
            selected={formValues.end}
            className="form-control"
            dateFormat={"Pp"}
            showTimeSelect
            timeCaption="Hora"
            locale="es"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            name="notes"
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};

const formInitialState = {
  title: "",
  notes: "",
  start: new Date(),
  end: addHours(new Date(), 2),
};

const useCalendarModal = () => {
  const { isDateModalOpen } = useUiStore();
  const { closeDateModal } = useUiStore();

  const { activeEvent, startSavingEvent } = useCalendarStore();
  const [formValues, setFormValues] = useState(formInitialState);
  const [formSubmited, setFormSubmited] = useState(false);

  const titleClass = useMemo(() => {
    if (!formSubmited) return "";

    return formValues.title.trim().length <= 2 ? "is-invalid" : "";
  }, [formValues.title, formSubmited]);

  useEffect(() => {
    if (activeEvent) {
      setFormValues({ ...activeEvent });
    } else {
      setFormValues(formInitialState);
    }
  }, [activeEvent]);

  const onCloseModal = () => {
    closeDateModal();
  };

  const onDateChange = (event: Date | null, changing: string) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onInputChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmited(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (difference <= 0 || isNaN(difference)) {
      Swal.fire("Fechas Incorrectas", "Revisa las fechas", "error");
      return;
    }

    if (formValues.title.trim().length <= 2) {
      return;
    }

    await startSavingEvent(formValues);
    closeDateModal();

    setFormSubmited(false);
  };

  return {
    isDateModalOpen,
    formValues,
    titleClass,
    onCloseModal,
    onDateChange,
    onInputChange,
    onSubmit,
  };
};
