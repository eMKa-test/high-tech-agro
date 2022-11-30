/* eslint-disable max-len */
import {SvgIcon, makeStyles} from "@material-ui/core";

const svgStyles = makeStyles({
  root: {
    width: 18,
    height: 18,
  },
});

function PropertyIcon() {
  const classes = svgStyles();

  return (
    <SvgIcon
      className={classes.root}
      viewBox="0 0 18 18">
      <path
        d="M6.13824 13.0222V17.2541L8.2542 15.1382L6.13824 13.0222Z"
        fill="#025FA3" />
      <path
        d="M8.99995 15.8842L6.884 18H11.1159L8.99995 15.8842Z"
        fill="#025FA3" />
      <path
        d="M6.884 12.2764L8.99995 14.3924L11.1159 12.2764H6.884Z"
        fill="#025FA3" />
      <path
        d="M9.74576 15.1382L11.8617 17.2541V13.0222L9.74576 15.1382Z"
        fill="#025FA3" />
      <path
        d="M17.9594 8.79795L15.4779 2.80689C15.4244 2.67769 15.3218 2.575 15.1925 2.52153L9.20137 0.0399132C9.07213 -0.0136299 8.92697 -0.0136299 8.79777 0.0399132L2.80664 2.52153C2.67741 2.575 2.57475 2.67769 2.52125 2.80689L0.0397013 8.79788C-0.0276933 8.96062 -0.00937689 9.14621 0.0884631 9.29267C0.186303 9.43913 0.3508 9.52702 0.526933 9.52702H1.69409V17.4724C1.69409 17.7637 1.9302 17.9998 2.22143 17.9998H5.08316V11.749C5.08316 11.4578 5.31927 11.2217 5.6105 11.2217H12.3886C12.6799 11.2217 12.916 11.4578 12.916 11.749V17.9998H15.7777C16.0689 17.9998 16.3051 17.7637 16.3051 17.4724V9.52709H17.4722C17.6484 9.52709 17.8128 9.4392 17.9107 9.29274C18.0086 9.14628 18.0268 8.96069 17.9594 8.79795ZM11.2214 7.30525C11.2214 7.59648 10.9853 7.83259 10.6941 7.83259H7.30507C7.01384 7.83259 6.77773 7.59648 6.77773 7.30525V3.91618C6.77773 3.62498 7.01384 3.38883 7.30507 3.38883H10.6941C10.9853 3.38883 11.2214 3.62498 11.2214 3.91618V7.30525Z"
        fill="#025FA3" />
      <path
        d="M17.9594 8.79795L15.4779 2.80689C15.4244 2.67769 15.3218 2.575 15.1925 2.52153L9.20137 0.0399132C9.07213 -0.0136299 8.92697 -0.0136299 8.79777 0.0399132L2.80664 2.52153C2.67741 2.575 2.57475 2.67769 2.52125 2.80689L0.0397013 8.79788C-0.0276933 8.96062 -0.00937689 9.14621 0.0884631 9.29267C0.186303 9.43913 0.3508 9.52702 0.526933 9.52702H1.69409V17.4724C1.69409 17.7637 1.9302 17.9998 2.22143 17.9998H5.08316V11.749C5.08316 11.4578 5.31927 11.2217 5.6105 11.2217H12.3886C12.6799 11.2217 12.916 11.4578 12.916 11.749V17.9998H15.7777C16.0689 17.9998 16.3051 17.7637 16.3051 17.4724V9.52709H17.4722C17.6484 9.52709 17.8128 9.4392 17.9107 9.29274C18.0086 9.14628 18.0268 8.96069 17.9594 8.79795ZM11.2214 7.30525C11.2214 7.59648 10.9853 7.83259 10.6941 7.83259H7.30507C7.01384 7.83259 6.77773 7.59648 6.77773 7.30525V3.91618C6.77773 3.62498 7.01384 3.38883 7.30507 3.38883H10.6941C10.9853 3.38883 11.2214 3.62498 11.2214 3.91618V7.30525Z"
        fill="#025FA3" />
      <path
        d="M10.1672 4.44385H7.83279V6.77823H10.1672V4.44385Z"
        fill="#025FA3" />
    </SvgIcon>
  );
}

export default PropertyIcon;
