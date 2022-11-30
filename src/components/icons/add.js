/* eslint-disable max-len */
import {SvgIcon, makeStyles} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 36,
    height: 36,
  },
});

function AddIcon() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 36 36">
      <path
        d="M17.9912 28.9645L17.9912 7.51953"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <path
        d="M7.16101 18.1342L28.606 18.1342"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round" />
    </SvgIcon>
  );
}

export default AddIcon;
