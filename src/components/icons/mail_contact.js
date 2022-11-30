/* eslint-disable max-len */
import {makeStyles, SvgIcon} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 18,
    height: 12,
  },
});

function MailContactIcon() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 14 12">
      <path
        fill="#181818"
        d="M0 0.803223V11.1975H14V0.803223H0ZM7 6.48851L1.78166 1.79146H12.2183L7 6.48851ZM4.98051 6.00038L0.988235 9.59387V2.4069L4.98051 6.00038ZM5.71912 6.6652L7 7.81815L8.28088 6.6652L12.2183 10.2093H1.78166L5.71912 6.6652ZM9.01949 6.00038L13.0118 2.4069V9.59387L9.01949 6.00038Z" />
    </SvgIcon>
  );
}

export default MailContactIcon;
