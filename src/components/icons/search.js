/* eslint-disable max-len */
import {SvgIcon, makeStyles} from "@material-ui/core";
import * as PropTypes from "prop-types";

const svgStyles = makeStyles({
  root: {
    width: 18,
    height: 18,
  },
});

function SearchIcon({color = "#025FA3"}) {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 18 18">
      <g clipPath="url(#clip0)">
        <path
          d="M16.9021 13.2388L14.3848 11.3508C15.0141 10.272 15.2838 9.01331 15.2838 7.66474C15.2838 3.43921 11.8674 0.0228271 7.64191 0.0228271C3.41638 0.0228271 0 3.43921 0 7.6647C0 11.8902 3.41638 15.3066 7.64191 15.3066C8.99048 15.3066 10.1592 14.947 11.328 14.4076L13.216 16.9249C14.205 18.1836 16.093 18.3634 17.2617 17.1946C18.3406 16.1158 18.2507 14.2278 16.9021 13.2388ZM7.64191 13.5086C4.40534 13.5086 1.7981 10.9013 1.7981 7.66474C1.7981 4.42816 4.40534 1.82092 7.64191 1.82092C10.8785 1.82092 13.4857 4.42816 13.4857 7.6647C13.4857 10.9012 10.8785 13.5086 7.64191 13.5086Z"
          fill={color} />
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

SearchIcon.propTypes = {
  color: PropTypes.string,
};

export default SearchIcon;
