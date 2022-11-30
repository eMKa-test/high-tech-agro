/* eslint-disable max-len */
import {SvgIcon, makeStyles} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 16,
    height: 16,
  },
});

function StepSuccessIcon() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 16 16">
      <path
        d="M15.75 8C15.75 12.2802 12.2802 15.75 8 15.75C3.71978 15.75 0.25 12.2802 0.25 8C0.25 3.71978 3.71978 0.25 8 0.25C12.2802 0.25 15.75 3.71978 15.75 8ZM7.10356 12.1036L12.8536 6.35356C13.0488 6.15831 13.0488 5.84172 12.8536 5.64647L12.1465 4.93937C11.9512 4.74409 11.6346 4.74409 11.4393 4.93937L6.75 9.62869L4.56066 7.43934C4.36541 7.24409 4.04881 7.24409 3.85353 7.43934L3.14644 8.14644C2.95119 8.34169 2.95119 8.65828 3.14644 8.85353L6.39644 12.1035C6.59172 12.2988 6.90828 12.2988 7.10356 12.1036Z"
        fill="#31C48D" />
    </SvgIcon>
  );
}

export default StepSuccessIcon;
