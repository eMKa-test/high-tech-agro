/* eslint-disable max-len */
import {makeStyles, SvgIcon} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 30,
    height: 30,
  },
});

function AddRoundIcon() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 30 30">
      <path
        d="M15 0.85C7.19747 0.85 0.85 7.19747 0.85 15C0.85 22.8025 7.19747 29.15 15 29.15C22.8025 29.15 29.15 22.8025 29.15 15C29.15 7.19747 22.8025 0.85 15 0.85ZM15 26.85C8.46582 26.85 3.14998 21.5342 3.14998 15C3.14998 8.46582 8.46582 3.14998 15 3.14998C21.5342 3.14998 26.85 8.46582 26.85 15C26.85 21.5342 21.5342 26.85 15 26.85Z"
        fill="white"
        stroke="white"
        strokeWidth="0.3" />
      {/* eslint-disable-next-line max-len */}
      <path
        d="M15 8.18398C14.3648 8.18398 13.85 8.69881 13.85 9.334V20.6673C13.85 21.3025 14.3648 21.8173 15 21.8173C15.6352 21.8173 16.15 21.3025 16.15 20.6673V9.334C16.15 8.69881 15.6352 8.18398 15 8.18398Z"
        fill="white"
        stroke="white"
        strokeWidth="0.3" />
      {/* eslint-disable-next-line max-len */}
      <path
        d="M20.6666 13.85H9.33327C8.69808 13.85 8.18325 14.3648 8.18325 15C8.18325 15.6352 8.69808 16.15 9.33327 16.15H20.6666C21.3018 16.15 21.8166 15.6352 21.8166 15C21.8166 14.3648 21.3018 13.85 20.6666 13.85Z"
        fill="white"
        stroke="white"
        strokeWidth="0.3" />
    </SvgIcon>
  );
}

export default AddRoundIcon;
