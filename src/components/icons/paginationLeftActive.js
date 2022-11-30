/* eslint-disable max-len */
import {makeStyles, SvgIcon} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 24,
    height: 25,
  },
});

function PaginationLeftActiveIcon() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 24 25">
      <path
        fill="none"
        d="M12 18.5449L6 12.5449L12 6.54492"
        stroke="#025FA3"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <path
        fill="none"
        d="M19 18.5449L13 12.5449L19 6.54492"
        stroke="#BFC9CE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round" />
    </SvgIcon>
  );
}

export default PaginationLeftActiveIcon;
