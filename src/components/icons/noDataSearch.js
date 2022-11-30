/* eslint-disable max-len */
import {SvgIcon, makeStyles} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 35,
    height: 35,
  },
});

function NoDataSearch() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      fill="none"
      viewBox="0 0 35 35">
      <path
        d="M32.8652 25.7423L27.9704 22.0712C29.1941 19.9734 29.7185 17.526 29.7185 14.9038C29.7185 6.68746 23.0756 0.0444946 14.8593 0.0444946C6.64297 0.0444946 0 6.68746 0 14.9037C0 23.1199 6.64297 29.763 14.8593 29.763C17.4815 29.763 19.7541 29.0637 22.0267 28.0148L25.6978 32.9096C27.6208 35.357 31.2919 35.7067 33.5645 33.4341C35.6623 31.3363 35.4874 27.6652 32.8652 25.7423ZM14.8593 26.2667C8.56593 26.2667 3.4963 21.1971 3.4963 14.9038C3.4963 8.61043 8.56593 3.54079 14.8593 3.54079C21.1526 3.54079 26.2222 8.61043 26.2222 14.9037C26.2222 21.197 21.1526 26.2667 14.8593 26.2667Z"
        fill="#025FA3" />
    </SvgIcon>
  );
}

export default NoDataSearch;
