/* eslint-disable max-len */
import {SvgIcon, makeStyles} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 20,
    height: 20,
  },
});

function CalendarIcon() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 20 20">
      <path
        d="M14.9074 4.22101C15.6738 4.22101 16.2947 3.60427 16.2947 2.83644V1.38731C16.2947 0.618797 15.6745 0 14.9074 0C14.1402 0 13.5208 0.618111 13.5208 1.38731V2.83713C13.5214 3.60427 14.1409 4.22101 14.9074 4.22101Z"
        fill="#025FA3" />
      <path
        d="M19.8358 2.39962H17.0433V3.10495C17.0433 4.26906 16.0976 5.21752 14.9315 5.21752C13.7639 5.21752 12.8203 4.26906 12.8203 3.10495V2.39962H7.18516V3.10495C7.18516 4.26906 6.23808 5.21752 5.0726 5.21752C3.90712 5.21752 2.96072 4.26975 2.96072 3.10495V2.39962L0.142822 2.36459V20H1.55211H18.4499L19.8571 19.9959L19.8358 2.39962ZM18.4485 18.5955H1.55211V7.3294H18.4499V18.5955H18.4485Z"
        fill="#025FA3" />
      <path
        d="M5.05061 4.22101C5.81707 4.22101 6.43862 3.60427 6.43862 2.83644V1.38731C6.43862 0.618111 5.81707 0 5.05061 0C4.28416 0 3.66467 0.618111 3.66467 1.38731V2.83713C3.66467 3.60427 4.28347 4.22101 5.05061 4.22101Z"
        fill="#025FA3" />
      <path
        d="M9.40835 8.84103H7.18933V10.7998H9.40835V8.84103Z"
        fill="#025FA3" />
      <path
        d="M12.9982 8.84103H10.7771V10.7998H12.9982V8.84103Z"
        fill="#025FA3" />
      <path
        d="M16.3236 8.84103H14.1046V10.7998H16.3236V8.84103Z"
        fill="#025FA3" />
      <path
        d="M9.40835 12.0937H7.18933V14.0511H9.40835V12.0937Z"
        fill="#025FA3" />
      <path
        d="M12.9982 12.0937H10.7771V14.0511H12.9982V12.0937Z"
        fill="#025FA3" />
      <path
        d="M16.3236 12.0937H14.1046V14.0511H16.3236V12.0937Z"
        fill="#025FA3" />
      <path
        d="M9.40835 15.4109H7.18933V17.3682H9.40835V15.4109Z"
        fill="#025FA3" />
      <path
        d="M5.88232 12.0937H3.66467V14.0511H5.88232V12.0937Z"
        fill="#025FA3" />
      <path
        d="M5.88232 15.4109H3.66467V17.3682H5.88232V15.4109Z"
        fill="#025FA3" />
      <path
        d="M12.9982 15.4109H10.7771V17.3682H12.9982V15.4109Z"
        fill="#025FA3" />
      <path
        d="M16.3236 15.4109H14.1046V17.3682H16.3236V15.4109Z"
        fill="#025FA3" />
    </SvgIcon>
  );
}

export default CalendarIcon;
