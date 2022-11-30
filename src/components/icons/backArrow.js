/* eslint-disable max-len */
import {SvgIcon, makeStyles} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 31,
    height: 31,
  },
});

function BackArrowIcon() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 31 31">
      <path
        d="M15.5 0.9C7.43681 0.9 0.9 7.43681 0.9 15.5C0.9 23.5632 7.43681 30.1 15.5 30.1C23.5632 30.1 30.1 23.5632 30.1 15.5C30.1 7.43681 23.5632 0.9 15.5 0.9ZM15.5 27.4833C8.88194 27.4833 3.51669 22.1181 3.51669 15.5C3.51669 8.88194 8.88194 3.51669 15.5 3.51669C22.1181 3.51669 27.4833 8.88194 27.4833 15.5C27.4833 22.1181 22.1181 27.4833 15.5 27.4833Z"
        fill="white"
        stroke="white"
        strokeWidth="0.2" />
      <path
        d="M18.8419 8.53319C18.331 8.02227 17.5026 8.02227 16.9916 8.53319L10.9499 14.5749C10.439 15.0858 10.439 15.9142 10.9499 16.4251L16.9916 22.4668C17.5026 22.9778 18.331 22.9778 18.8419 22.4668C19.3528 21.9559 19.3528 21.1275 18.8419 20.6166L13.7253 15.5L18.8419 10.3835C19.3528 9.87254 19.3528 9.04418 18.8419 8.5332L18.7712 8.6039L18.8419 8.53319Z"
        fill="white"
        stroke="white"
        strokeWidth="0.2" />
    </SvgIcon>
  );
}

export default BackArrowIcon;
