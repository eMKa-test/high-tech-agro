/* eslint-disable max-len */
import {SvgIcon, makeStyles} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 23,
    height: 23,
  },
});

function PhoneIcon() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 23 23">
      <path
        d="M14.3307 9.05095C14.1226 8.84278 13.7847 8.84278 13.5765 9.05095C13.3683 9.25912 13.3683 9.59703 13.5765 9.8052C14.4084 10.6371 14.4084 11.9903 13.5765 12.8222C13.3683 13.0304 13.3683 13.3683 13.5765 13.5764C13.7847 13.7846 14.1226 13.7846 14.3307 13.5764C15.5783 12.3289 15.5783 10.2985 14.3307 9.05095Z"
        fill="#025FA3" />
      <path
        d="M15.8392 7.54248C15.631 7.33431 15.2931 7.33431 15.0849 7.54248C14.8767 7.75066 14.8767 8.08856 15.0849 8.29673C16.7488 9.9606 16.7488 12.6668 15.0849 14.3307C14.8767 14.5389 14.8767 14.8768 15.0849 15.085C15.2931 15.2931 15.631 15.2931 15.8392 15.085C17.9186 13.0055 17.9186 9.62194 15.8392 7.54248Z"
        fill="#025FA3" />
      <path
        d="M17.3477 6.034C17.1395 5.82583 16.8016 5.82583 16.5935 6.034C16.3853 6.24217 16.3853 6.58007 16.5935 6.78825C19.0893 9.28405 19.0893 13.3434 16.5935 15.8392C16.3853 16.0474 16.3853 16.3853 16.5935 16.5935C16.8016 16.8016 17.1395 16.8016 17.3477 16.5935C20.2591 13.6821 20.2583 8.94464 17.3477 6.034Z"
        fill="#025FA3" />
      <path
        d="M13.1993 18.4791C12.1041 17.3839 11.2994 16.1024 10.8076 14.6709C10.7623 14.5351 10.6635 14.4257 10.5361 14.3646C10.4078 14.3028 10.2608 14.2945 10.1273 14.3405L8.30727 14.9748C7.6292 12.5846 7.62844 10.0451 8.30727 7.6556L10.128 8.28766C10.2623 8.33443 10.4086 8.32538 10.5368 8.26353C10.6635 8.20168 10.7616 8.09156 10.8076 7.95655C11.2994 6.52499 12.1041 5.24352 13.1993 4.14835C13.4075 3.94018 13.4075 3.60228 13.1993 3.39411L10.9366 1.13137C10.7284 0.923193 10.3905 0.923193 10.1823 1.13137C4.56771 6.74598 4.56771 15.8814 10.1823 21.496C10.3905 21.7042 10.7284 21.7042 10.9366 21.496L13.1993 19.2333C13.4075 19.0251 13.4075 18.6872 13.1993 18.4791Z"
        fill="#025FA3" />
    </SvgIcon>
  );
}

export default PhoneIcon;