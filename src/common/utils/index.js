import {useTheme, useMediaQuery} from "@material-ui/core";
import moment from "moment";

export const isLaptop = () => {
  const theme = useTheme();
  return useMediaQuery(theme.breakpoints.between("xs", "sm"));
};

export const formAuditNumber = (num, prefixCount = 8) => {
  let result = "";
  for (let i = 0; i < prefixCount - String(num).length; i += 1) {
    result += "0";
  }
  result += num;
  return result;
};

export const declination = (number, titles) => {
  const cases = [2, 0, 1, 1, 1, 2];
  const result = titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
  return `${number} ${result}`;
};

export const getTimeString = (date) => {
  const _month = moment(date).format("MMMM").slice(0, 3);
  const month = _month[0].toUpperCase() + _month.slice(1);
  const day = moment(date).format("DD");
  const year = moment(date).format("YYYY");
  return `${month} ${day}, ${year}`;
};

export const formDate = (momentDate, format = "YYYY-MM-DD") => {
  if (momentDate instanceof moment) {
    return momentDate.format(format);
  }
  return moment(momentDate).format(format);
};

export const screenMediaRule = (screenSizeStart = "834", rangeTypeStart = "max-width", screenSizeEnd, rangeTypeEnd) => {
  let query = `@media (${rangeTypeStart}:${screenSizeStart}px)`;
  if (rangeTypeEnd && screenSizeEnd) {
    query = `@media (${rangeTypeStart}:${screenSizeStart}px) and (${rangeTypeEnd}:${screenSizeEnd}px)`;
  }
  return useMediaQuery(query);
};

export default null;
