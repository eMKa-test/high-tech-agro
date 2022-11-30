import {memo} from "react";
import * as PropTypes from "prop-types";
import {Box, Button} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/styles";
import get from "lodash/get";
import Text from "../../inputs/Text";
import styles from "./styles";
import {NO_VALUE} from "../../../common/vars";
import EditIcon from "../../icons/edit";

const useStyles = makeStyles(styles);

function Header(props) {
  const classes = useStyles();
  const {palette: {text}} = useTheme();
  const {property, openModal} = props;

  const propertyTitle = get(property, "title", NO_VALUE);
  const propertyAddress = get(property, "address.text", NO_VALUE);

  return (
    <Box className={classes.cardHeader}>
      <div>
        <Text
          margin="0 0 15px 0"
          color={text.primary}
          size={20}
          weight={500}>
          {propertyTitle}
        </Text>
        <Text
          weight={300}
          size={12}
          color="#969BA0">
          {propertyAddress}
        </Text>
      </div>
      <Button
        onClick={openModal}
        disableRipple
        className={classes.editButton}>
        <EditIcon />
      </Button>
    </Box>
  );
}

Header.propTypes = {
  property: PropTypes.shape({
    title: PropTypes.string,
    address: PropTypes.shape({
      text: PropTypes.string,
    }),
  }),
  openModal: PropTypes.func.isRequired,
};

export default memo(Header);
