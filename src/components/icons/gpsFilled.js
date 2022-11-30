/* eslint-disable max-len */
import {SvgIcon, makeStyles} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 20,
    height: 20,
  },
});

function GPSFilledIcon() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 20 20">
      {/* eslint-disable-next-line max-len */}
      <path
        d="M9.99983 4.03423C8.45963 4.03423 7.20667 5.28723 7.20667 6.82739C7.20667 8.36758 8.45967 9.62055 9.99983 9.62055C11.54 9.62055 12.793 8.36755 12.793 6.82739C12.793 5.28723 11.54 4.03423 9.99983 4.03423Z"
        fill="#025FA3" />
      {/* eslint-disable-next-line max-len */}
      <path
        d="M9.9999 0C6.17596 0 3.06494 3.11102 3.06494 6.93496C3.06494 8.4991 4.16217 11.0769 6.32611 14.5968C7.90822 17.1702 9.51272 19.3421 9.52873 19.3637L9.9999 20L10.4711 19.3637C10.4871 19.3421 12.0916 17.1702 13.6737 14.5968C15.8376 11.0769 16.9349 8.4991 16.9349 6.93496C16.9349 3.11102 13.8238 0 9.9999 0ZM9.9999 10.7932C7.81318 10.7932 6.0342 9.01418 6.0342 6.8275C6.0342 4.64078 7.81322 2.8618 9.9999 2.8618C12.1866 2.8618 13.9656 4.64082 13.9656 6.8275C13.9656 9.01418 12.1866 10.7932 9.9999 10.7932Z"
        fill="#025FA3" />
    </SvgIcon>
  );
}

export default GPSFilledIcon;
