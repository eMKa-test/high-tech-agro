/* eslint-disable max-len */
import {SvgIcon, makeStyles} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 16,
    height: 16,
  },
});

function StepWaitIcon() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 16 16">
      <path
        d="M8 0.25C3.71978 0.25 0.25 3.71978 0.25 8C0.25 12.2802 3.71978 15.75 8 15.75C12.2802 15.75 15.75 12.2802 15.75 8C15.75 3.71978 12.2802 0.25 8 0.25ZM10.5 8C10.5 9.3785 9.3785 10.5 8 10.5C6.6215 10.5 5.5 9.3785 5.5 8C5.5 6.6215 6.6215 5.5 8 5.5C9.3785 5.5 10.5 6.6215 10.5 8Z"
        fill="#D1D4DC" />
    </SvgIcon>
  );
}

export default StepWaitIcon;
