import {memo, useCallback} from "react";
import * as PropTypes from "prop-types";
import get from "lodash/get";
import {
  Button, Box, makeStyles, IconButton,
} from "@material-ui/core";
import classnames from "classnames";
import CloseIcon from "@material-ui/icons/Close";
import Text from "../inputs/Text";
import styles from "./styles";
import {ERRORS} from "../../common/vars";

const useStyles = makeStyles(styles);

function IllItem({
  ill, onSelect, isSelected, removeIllFromList, canRemove,
}) {
  const classes = useStyles();

  const illTitle = get(ill, "title", ERRORS.UNKNOWN);

  return (
    <Box
      className={classnames(classes.illItemContainer, {
        [classes.selectedIll]: isSelected,
      })}>
      <Button
        fullWidth
        color="inherit"
        className={classes.illButtonItem}
        onClick={() => onSelect(ill)}>
        <Text
          color="inherit"
          weight={400}
          size={14}
          lineHeight={1.15}>
          {illTitle}
        </Text>
      </Button>
      {canRemove ? (
        <IconButton
          onClick={() => removeIllFromList(ill)}
          title="Удалить болезнь"
          className={classes.removeIllFromIllList}
          size="small">
          <CloseIcon />
        </IconButton>
      ) : null}
    </Box>
  );
}

IllItem.propTypes = {
  ill: PropTypes.shape({
    uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
  }),
  onSelect: PropTypes.func.isRequired,
  removeIllFromList: PropTypes.func,
  isSelected: PropTypes.bool,
  activeZone: PropTypes.string,
  canRemove: PropTypes.bool,
};

export default memo(IllItem);
