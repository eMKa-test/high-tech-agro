/* eslint-disable max-len */
import {makeStyles, SvgIcon} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 24,
    height: 25,
  },
});

function PaginationRightUnActiveIcon() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 24 25">
      <path
        fill="none"
        d="M12 18.5449L18 12.5449L12 6.54492"
        stroke="#BFC9CE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round" />
      <path
        fill="none"
        d="M5 18.5449L11 12.5449L5 6.54492"
        stroke="#BFC9CE"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round" />
    </SvgIcon>
  );
}

export default PaginationRightUnActiveIcon;
