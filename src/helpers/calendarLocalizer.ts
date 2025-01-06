import { format, parse, startOfWeek, getDay } from "date-fns";
import { es } from "date-fns/locale";
import { dateFnsLocalizer } from "react-big-calendar";

const locales = {
  es: es,
};

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});
