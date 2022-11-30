import {declination} from "../../common/utils";
import {UNKNOWN} from "../../common/vars";

export const options = [
  {
    label: "Протокол",
    value: "report",
  },
  {
    label: "Анализ",
    value: "analyze",
  },
  {
    label: "Другое",
    value: "other",
  },
];

export const getCows = (len) => {
  if (len > 0) {
    return `${declination(len, ["корова", "коровы", "коров"])} в осмотре`;
  } if (len === 0) {
    return "0 коров в осмотре";
  }
  return UNKNOWN;
};
