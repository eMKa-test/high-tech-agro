/* eslint-disable max-len */
import {makeStyles, SvgIcon} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 18,
    height: 18,
  },
});

function PasswordField() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 18 18">
      <g clipPath="url(#clip0)">
        <path
          d="M14.0625 6.75H13.5V4.5C13.5 2.01825 11.4818 0 9 0C6.51825 0 4.5 2.01825 4.5 4.5V6.75H3.9375C3.0075 6.75 2.25 7.50675 2.25 8.4375V16.3125C2.25 17.2432 3.0075 18 3.9375 18H14.0625C14.9925 18 15.75 17.2432 15.75 16.3125V8.4375C15.75 7.50675 14.9925 6.75 14.0625 6.75ZM6 4.5C6 2.8455 7.3455 1.5 9 1.5C10.6545 1.5 12 2.8455 12 4.5V6.75H6V4.5ZM9.75 12.5415V14.25C9.75 14.664 9.41475 15 9 15C8.58525 15 8.25 14.664 8.25 14.25V12.5415C7.80375 12.2812 7.5 11.8027 7.5 11.25C7.5 10.4227 8.17275 9.75 9 9.75C9.82725 9.75 10.5 10.4227 10.5 11.25C10.5 11.8027 10.1962 12.2812 9.75 12.5415Z"
          fill="#025FA3" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width="18"
            height="18"
            fill="white" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}

export default PasswordField;
