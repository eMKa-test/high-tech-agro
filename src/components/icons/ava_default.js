/* eslint-disable max-len */
import {SvgIcon, makeStyles} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 101,
    height: 101,
  },
});

function AvaDefaultIcon() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 101 101">
      <rect
        width="101"
        height="101"
        fill="#E8EBF6" />
      <g clipPath="url(#clip0)">
        <path
          d="M50.5 14.427C37.6664 14.427 27.3811 24.0922 27.3811 36.0703C27.41 37.3458 27.5053 39.1895 27.627 40.7432C25.4324 41.6747 25.2723 45.9459 27.1351 50.3351C27.8739 52.0757 28.8147 53.4122 29.8405 54.5162C30.0898 55.7498 30.0244 56.3036 30.3324 57.7135C31.192 60.2923 34.581 65.3464 37.7108 69.5189C38.0177 72.7234 38.3361 75.9572 37.7108 79.6027C28.6926 87.0847 5.45733 90.3029 5.49189 98.0487L5 101H96L95.5081 98.0487C95.4711 91.4193 72.1968 87.3485 63.2892 79.6027C62.9288 76.6376 62.8601 73.6691 63.0433 70.7487C65.8952 66.3476 69.7102 60.5858 70.6676 57.7135C71.0117 56.259 71.1369 55.2767 71.4054 54.0243C72.26 52.9892 72.9894 51.8184 73.6189 50.3351C75.3887 46.1654 75.2743 42.1848 73.373 40.9892C73.4851 39.3091 73.5696 37.5215 73.6189 36.0703C73.6189 24.0922 63.3337 14.427 50.5 14.427H50.5Z"
          fill="#BEBEBE" />
      </g>
      <defs>
        <clipPath id="clip0">
          <rect
            width="91"
            height="91"
            fill="white"
            transform="translate(5 10)" />
        </clipPath>
      </defs>
    </SvgIcon>
  );
}

export default AvaDefaultIcon;
