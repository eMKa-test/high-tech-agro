import {
  memo, useCallback, useContext, useEffect,
} from "react";
import * as PropTypes from "prop-types";
import {useTheme, makeStyles} from "@material-ui/styles";
import {useRouteMatch, useHistory} from "react-router";
import {Box} from "@material-ui/core";
import CustomButton from "../../../components/inputs/CustomButton";
import Text from "../../../components/inputs/Text";
import BackArrowIcon from "../../../components/icons/backArrow";
import styles from "../styles";
import AnimalsList from "../../../components/Animals";
import AddRoundIcon from "../../../components/icons/add_round";
import eventEmitter from "../../../common/utils/emitter";
import LinearLoader from "../../../components/Loaders/LinearLoader";
import {CowsContext} from "../../../providers/Cows";

const useStyles = makeStyles(styles);

function Inspection(props) {
  const {
    closeDrawer, openAddCow,
  } = props;
  const {params} = useRouteMatch("/audit/card/:auditId");
  const {props: colorTheme} = useTheme();
  const history = useHistory();
  const classes = useStyles();
  const {getCows, load, cows} = useContext(CowsContext);

  const getCowList = useCallback((callback) => {
    const auditId = params?.auditId;
    getCows(auditId, () => {
      if (typeof callback === "function") {
        closeDrawer();
        callback();
      }
    });
  }, [closeDrawer, params?.auditId]);

  useEffect(() => {
    if (params?.auditId) {
      getCowList();
    }
  }, [params?.auditId]);

  const goBack = useCallback(() => {
    closeDrawer();
    history.push("/audit");
  }, [params?.auditId]);

  useEffect(() => {
    eventEmitter.on("updateCowList", getCowList);
    return () => eventEmitter.off("updateCowList", getCowList);
  }, []);

  return (
    <div className={classes.cowsListWrapper}>
      <div>
        <CustomButton
          fullWidth
          extStyle={classes.asideActionButton}
          bg={colorTheme.ORANGE}
          onClick={openAddCow}>
          <Box
            display="flex"
            alignItems="center"
            mr={1}>
            <AddRoundIcon />
          </Box>
          <Text variant="body1">
            Добавить корову
          </Text>
        </CustomButton>
        <Box
          mt={2.5}
          ml={1}>
          <Text
            weight={700}
            variant="h6">
            Список коров
          </Text>
        </Box>
      </div>
      <div className={classes.cowList}>
        <div className={classes.list}>
          {load ? <LinearLoader height={2} /> : <Box height="2px" />}
          {cows?.length ? (
            <AnimalsList
              openAddCow={openAddCow}
              closeDrawer={closeDrawer}
              animals={cows} />
          ) : null}
        </div>
        <CustomButton
          fullWidth
          extStyle={classes.asideActionButton}
          bg={colorTheme.BLUE}
          onClick={goBack}>
          <Box
            display="flex"
            alignItems="center"
            mr={1}>
            <BackArrowIcon />
          </Box>
          <Text variant="body1">Вернуться в осмотры</Text>
        </CustomButton>
      </div>
    </div>
  );
}

Inspection.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
  openAddCow: PropTypes.func.isRequired,
};

export default memo(Inspection);
