/* eslint-disable max-len */
import {SvgIcon, makeStyles} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 16,
    height: 16,
  },
});

function StepUnactiveIcon() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 16 16">
      <path
        d="M8 0.25C3.71875 0.25 0.25 3.71875 0.25 8C0.25 12.2812 3.71875 15.75 8 15.75C12.2812 15.75 15.75 12.2812 15.75 8C15.75 3.71875 12.2812 0.25 8 0.25ZM8 14.25C4.54688 14.25 1.75 11.4531 1.75 8C1.75 4.54688 4.54688 1.75 8 1.75C11.4531 1.75 14.25 4.54688 14.25 8C14.25 11.4531 11.4531 14.25 8 14.25Z"
        fill="#D1D4DC" />
    </SvgIcon>
  );
}

export default StepUnactiveIcon;
