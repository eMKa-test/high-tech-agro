/* eslint-disable max-len */
import {makeStyles, SvgIcon} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 30,
    height: 30,
  },
});

function RemoveIcon() {
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
      <path
        d="M10.1799 10.1805C9.73076 10.6296 9.73077 11.3577 10.1799 11.8068L18.1938 19.8207C18.6429 20.2699 19.371 20.2699 19.8201 19.8207C20.2693 19.3716 20.2693 18.6435 19.8201 18.1944L11.8063 10.1805C11.3571 9.73133 10.629 9.73133 10.1799 10.1805Z"
        fill="white"
        stroke="white"
        strokeWidth="0.3" />
      <path
        d="M18.1933 10.18L10.1794 18.1939C9.73028 18.643 9.73027 19.3711 10.1794 19.8203C10.6286 20.2694 11.3566 20.2694 11.8058 19.8203L19.8197 11.8064C20.2688 11.3572 20.2688 10.6292 19.8197 10.18C19.3705 9.73088 18.6424 9.73088 18.1933 10.18Z"
        fill="white"
        stroke="white"
        strokeWidth="0.3" />
    </SvgIcon>
  );
}

export default RemoveIcon;
