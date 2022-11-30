/* eslint-disable max-len */
import {SvgIcon, makeStyles} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 18,
    height: 18,
  },
});

function DatePickerLeftIcon() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 9 18">
      <path
        d="M8.625 17.5L0.375 9L8.625 0.5"
        fill="#161616"
        fillOpacity="0.19" />
    </SvgIcon>
  );
}

export default DatePickerLeftIcon;
