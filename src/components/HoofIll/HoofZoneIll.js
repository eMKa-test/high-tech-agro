import {memo, Fragment} from "react";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/styles";
import {Paper, Divider} from "@material-ui/core";
import Text from "../inputs/Text";
import styles from "./styles";

const useStyles = makeStyles(styles);

const types = [
  {
    value: "hoofFL",
    title: "Левая передняя",
  },
  {
    value: "hoofFR",
    title: "Правая передняя",
  },
  {
    value: "hoofBL",
    title: "Левая задняя",
  },
  {
    value: "hoofBR",
    title: "Правая задняя",
  },
];

function HoofZoneIll(props) {
  const {collect, removeIll} = props;
  const classes = useStyles();

  return (
    <div className={classes.hoofZoneIllRoot}>
      {types.map((type, i) => (
        <div
          key={String(i)}
          className={classes.hoofZoneIllWrapper}>
          <Paper
            className={classes.hoofZoneIll}
            elevation={0}>
            <div className={classes.headerHoofZoneIll}>
              <Text
                noWrap
                size={14}
                weight={700}>
                {type.title}
              </Text>
            </div>
            {collect[type.value]?.length > 0 ? collect[type.value].map((el, k) => {
              return (
                <Fragment key={String(k)}>
                  <div
                    className={classes.bodyHoofZoneIll}>
                    <Text
                      size={14}
                      weight={400}>
                      {el?.title}
                    </Text>
                    {/* <IconButton */}
                    {/*  onClick={() => removeIll(null, el?.diseaseId)} */}
                    {/*  title="Удалить болезнь" */}
                    {/*  className={classes.removeIllFromHoofType} */}
                    {/*  size="small"> */}
                    {/*  <CloseIcon /> */}
                    {/* </IconButton> */}
                  </div>
                  <Divider className={classes.divider} />
                </Fragment>
              );
            }) : (
              <Fragment>
                <div
                  className={classes.bodyHoofZoneIll}>
                  <Text
                    size={14}
                    weight={400}>
                    Здорова
                  </Text>
                </div>
                <Divider className={classes.divider} />
              </Fragment>
            )}
          </Paper>
        </div>
      ))}
    </div>
  );
}

HoofZoneIll.propTypes = {
  collect: PropTypes.shape({
    hoofFL: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })),
    hoofFR: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })),
    hoofBL: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })),
    hoofBR: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string,
      uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })),
  }),
  removeIll: PropTypes.func.isRequired,
};

export default memo(HoofZoneIll);
