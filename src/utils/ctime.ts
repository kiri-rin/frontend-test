import { format } from "date-fns";

export const formatCtime = (ctime: string) =>
  format(Number(ctime) * 1000, "dd.MM.yyyy HH:mm");
