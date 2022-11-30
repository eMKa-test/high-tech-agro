import {
  memo, useCallback, useEffect, useReducer,
} from "react";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/styles";
import {Box} from "@material-ui/core";
import isEmpty from "lodash/isEmpty";
import {useSnackbar} from "notistack";
import styles from "./styles";
import {getData, postData} from "../../common/api/request";
import {
  initialState,
  reducer,
  actionSetType,
  actionSetZone,
  actionLoadIlls,
  actionGetDiseases,
  actionSetIll,
  actionGetHoofIlls,
  actionSetCowIlls,
  actionGetList,
  actionOpenConfirm,
} from "./reducer";
import LegTypes from "./LegTypes";
import IllsList from "./IllsList";
import Hoofs from "../Hoof";
import HoofZones from "./HoofZones";
import HoofZoneIll from "./HoofZoneIll";
import ConfirmModal from "../modals/ConfirmModal";
import {screenMediaRule} from "../../common/utils";
import Modal from "../modals/modal";
import {ILLS_LIMIT} from "../../common/vars";

const useStyles = makeStyles(styles);

function HoofIll(props) {
  const {
    cow, updateCow, updateIlls, ills,
  } = props;
  const classes = useStyles();
  const {enqueueSnackbar: openBar} = useSnackbar();
  const [{
    load,
    activeType,
    activeZone,
    loadIlls,
    hoofIlls,
    collect,
    diseases,
    list,
    confirm,
    hoofBadges,
  }, dispatch] = useReducer(reducer, initialState(), initialState);
  const media = screenMediaRule(768);

  const getDiseases = useCallback(async () => {
    dispatch(actionLoadIlls(true));
    try {
      const responseDiseases = await getData("/diseases", {params: {limit: ILLS_LIMIT}});
      if (Array.isArray(responseDiseases?.payload)) {
        dispatch(actionGetDiseases(responseDiseases.payload));
        dispatch(actionSetCowIlls(cow.graph));
      }
      dispatch(actionLoadIlls(false));
    } catch (err) {
      console.error(err);
      dispatch(actionLoadIlls(false));
    }
  }, [cow]);

  useEffect(() => {
    if (cow?.uuid) {
      getDiseases();
    }
  }, [cow?.uuid]);

  const getHoofIlls = useCallback(async () => {
    try {
      const response = await getData("/diseases/graph", {params: {diseased: activeType}});
      if (!isEmpty(response?.payload)) {
        dispatch(actionGetHoofIlls(response.payload));
      }
    } catch (err) {
      console.error(err);
    }
  }, [activeType]);

  useEffect(() => {
    if (activeType && activeZone) {
      dispatch(actionGetList());
    }
  }, [activeType, activeZone]);

  useEffect(() => {
    getHoofIlls();
  }, [activeType]);

  useEffect(() => {
    if (cow?.uuid) {
      getHoofIlls();
      if (updateCow) {
        updateCow((graph) => {
          dispatch(actionSetCowIlls(graph));
        });
      }
    }
  }, [activeType, updateCow, cow?.uuid]);

  const changeLegType = useCallback((type) => {
    dispatch(actionSetType(type));
  }, []);

  const onSelectZone = useCallback((zone) => () => {
    dispatch(actionSetZone(zone));
  }, []);

  const onSelectIll = useCallback(async (ill, deleteId) => {
    try {
      const url = `/cows/${cow.uuid}`;
      let match;
      if (ill) {
        match = diseases.find((d) => ill.diseaseId === d.uuid)?.uuid;
      } else {
        match = deleteId;
      }
      if (match) {
        const body = {disease: match};
        const response = await postData(url, {body});
        if (response?.payload) {
          updateCow((graph) => {
            dispatch(actionSetCowIlls(graph));
          });
        }
      } else {
        openBar("Не удалось добавить болезнь", {variant: "error"});
      }
    } catch (err) {
      console.error(err);
    }
    dispatch(actionSetIll(ill));
    return null;
  }, [cow?.uuid, diseases, updateCow]);

  const onUpdateDisease = useCallback(async (item) => {
    try {
      const body = {
        diseased: activeType,
        position: activeZone,
        illId: item.uuid,
      };
      await postData("/diseases/update", {body});
      await getHoofIlls();
    } catch (err) {
      console.error(err);
    }
  }, [activeZone, activeType]);

  const removeIllFromList = useCallback(async (ill) => {
    dispatch(actionOpenConfirm(ill));
  }, []);

  const onConfirm = useCallback(() => {
    console.log("Удаление болезни подтверждено");
    // POST DELETE ILL confirm.uuid
    dispatch(actionOpenConfirm(null));
  }, [confirm]);

  const mobileIllsModalClose = useCallback(() => {
    dispatch(actionSetZone(""));
  }, []);

  return (
    <div className={classes.audit}>
      <Box
        mt={2}
        className={classes.auditRoot}>
        <Box
          className={classes.gridBottomSpacing}>
          <LegTypes
            onChange={changeLegType}
            active={activeType} />
          <Box
            mt={5}
            mb={4}>
            <Hoofs
              activeZone={activeZone}
              onSelect={onSelectZone} />
          </Box>
        </Box>
        {!media ? (
          <Box className={classes.illListWrapper}>
            <IllsList
              activeType={activeType}
              updateCallback={updateIlls}
              collect={collect}
              hoofIlls={hoofIlls}
              activeZone={activeZone}
              removeIllFromList={removeIllFromList}
              load={loadIlls}
              onSelect={onSelectIll}
              onUpdateDisease={onUpdateDisease}
              ills={list || ills} />
          </Box>
        ) : null}
      </Box>
      <HoofZones
        hoofBadges={hoofBadges}
        activeZone={activeZone}
        onSelectZone={onSelectZone}
        hoofIlls={hoofIlls} />
      {cow ? (
        <Box mt={5}>
          <HoofZoneIll
            removeIll={onSelectIll}
            collect={collect} />
        </Box>
      ) : null}
      <Modal
        onClose={mobileIllsModalClose}
        open={Boolean(activeZone) && media}>
        <IllsList
          activeType={activeType}
          updateCallback={updateIlls}
          collect={collect}
          hoofIlls={hoofIlls}
          activeZone={activeZone}
          removeIllFromList={removeIllFromList}
          load={loadIlls}
          onSelect={onSelectIll}
          onUpdateDisease={onUpdateDisease}
          ills={list || ills} />
      </Modal>
      <ConfirmModal
        onConfirm={onConfirm}
        afterConfirmed={updateIlls}
        title="Вы действительно хотите удалить выбранную болезнь?"
        onClose={() => dispatch(actionOpenConfirm(null))}
        open={Boolean(confirm)} />
    </div>
  );
}

HoofIll.propTypes = {
  updateCow: PropTypes.func,
  updateIlls: PropTypes.func,
  cow: PropTypes.shape({
    uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    graph: PropTypes.shape({

    }),
  }),
};

export default memo(HoofIll);
