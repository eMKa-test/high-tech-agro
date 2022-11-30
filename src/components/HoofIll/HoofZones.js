import {memo} from "react";
import * as PropTypes from "prop-types";
import {useTheme, makeStyles} from "@material-ui/styles";
import classnames from "classnames";
import styles from "./styles";
import {hoofZones} from "./herlpers";
import Badge from "../Badge";
import CustomButton from "../inputs/CustomButton";
import Text from "../inputs/Text";
import {screenMediaRule} from "../../common/utils";

const useStyles = makeStyles(styles);

function HoofZones(props) {
  const {
    activeZone, hoofIlls, onSelectZone, hoofBadges,
  } = props;
  const {props: colorTheme, palette: {common}, text} = useTheme();
  const classes = useStyles();
  const media = screenMediaRule(750);

  return hoofZones.map((line, i) => (
    <div
      key={String(i)}
      className={classnames(classes.hoofZones, {
        [classes.wrapRows]: media,
      })}>
      {line.map((hoof, k) => {
        const active = activeZone === hoof.value;
        let countIlls;
        if (hoofBadges) {
          countIlls = hoofBadges[hoof.value] || 0;
        } else {
          countIlls = hoofIlls[hoof.value]?.length;
        }
        return (
          <div
            className={classes.hoofZonesItem}
            key={String(k)}>
            <Badge count={countIlls}>
              <CustomButton
                size={44}
                format="square"
                bg={active ? colorTheme.ORANGE : colorTheme.BLUE_LIGHTER}
                onClick={onSelectZone(String(hoof.value))}>
                <Text
                  color={active ? common.white : text.primary}
                  size={14}
                  weight={700}>
                  {hoof.title}
                </Text>
              </CustomButton>
            </Badge>
          </div>
        );
      })}
    </div>
  ));
}

HoofZones.propTypes = {
  activeZone: PropTypes.string.isRequired,
  onSelectZone: PropTypes.func.isRequired,
  hoofBadges: PropTypes.shape({

  }),
  hoofIlls: PropTypes.shape({

  }),
};

export default memo(HoofZones);
