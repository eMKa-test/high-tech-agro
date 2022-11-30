import {memo, useCallback} from "react";
import * as Proptypes from "prop-types";
import {
  makeStyles, ButtonGroup, Button,
} from "@material-ui/core";
import classnames from "classnames";
import Box from "@material-ui/core/Box";
import styles from "./styles";
import Text from "../inputs/Text";
import {screenMediaRule} from "../../common/utils";

const useStyles = makeStyles(styles);

function LegTypes({onChange, active}) {
  const classes = useStyles();
  const media = screenMediaRule(767);

  const legStyle = useCallback((type) => {
    return classnames(classes.legType, {
      [classes.active]: active === type,
    });
  }, [active]);

  const onClick = useCallback((legType) => () => {
    onChange(legType);
  }, [onChange]);

  if (media) {
    return (
      <Box align="center">
        <ButtonGroup className={classes.buttonGroup}>
          <Button
            onClick={onClick("hoofFL")}
            className={legStyle("hoofFL")}>
            <Text
              noWrap
              size={14}
              weight={700}>
              Левая передняя
            </Text>
          </Button>
          <Button
            onClick={onClick("hoofFR")}
            className={legStyle("hoofFR")}>
            <Text
              noWrap
              size={14}
              weight={700}>
              Правая передняя
            </Text>
          </Button>
        </ButtonGroup>
        <Box mt={0.25}>
          <ButtonGroup className={classes.buttonGroup}>
            <Button
              onClick={onClick("hoofBL")}
              className={legStyle("hoofBL")}>
              <Text
                noWrap
                size={14}
                weight={700}>
                Левая задняя
              </Text>
            </Button>
            <Button
              onClick={onClick("hoofBR")}
              className={legStyle("hoofBR")}>
              <Text
                noWrap
                size={14}
                weight={700}>
                Правая задняя
              </Text>
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
    );
  }

  return (
    <ButtonGroup
      className={classes.buttonGroup}>
      <Button
        onClick={onClick("hoofFL")}
        className={legStyle("hoofFL")}>
        <Text
          noWrap
          size={14}
          weight={700}>
          Левая передняя
        </Text>
      </Button>
      <Button
        onClick={onClick("hoofFR")}
        className={legStyle("hoofFR")}>
        <Text
          noWrap
          size={14}
          weight={700}>
          Правая передняя
        </Text>
      </Button>
      <Button
        onClick={onClick("hoofBL")}
        className={legStyle("hoofBL")}>
        <Text
          noWrap
          size={14}
          weight={700}>
          Левая задняя
        </Text>
      </Button>
      <Button
        onClick={onClick("hoofBR")}
        className={legStyle("hoofBR")}>
        <Text
          noWrap
          size={14}
          weight={700}>
          Правая задняя
        </Text>
      </Button>
    </ButtonGroup>
  );
}

LegTypes.propTypes = {
  onChange: Proptypes.func,
  active: Proptypes.string,
};

export default memo(LegTypes);
