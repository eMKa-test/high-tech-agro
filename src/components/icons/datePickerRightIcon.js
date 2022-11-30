/* eslint-disable max-len */
import {SvgIcon, makeStyles} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 18,
    height: 18,
  },
});
function DatePickerRightIcon() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 9 18">
      <path
        d="M0.375 17.5L8.625 9L0.375 0.5"
        fill="#161616"
        fillOpacity="0.19" />
    </SvgIcon>
  );
}

export default DatePickerRightIcon;
