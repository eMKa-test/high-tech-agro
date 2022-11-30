import {
  memo, Fragment, useCallback, useState,
} from "react";
import * as PropTypes from "prop-types";
import {Paper, Box} from "@material-ui/core";
import {makeStyles, useTheme} from "@material-ui/styles";
import Text from "../inputs/Text";
import styles from "./styles";
import IllItem from "./IllItem";
import LinearLoader from "../Loaders/LinearLoader";
import CustomButton from "../inputs/CustomButton";
import AddIcon from "../icons/add";
import Modal from "../modals/modal";
import AddIll from "../Cards/AddIll";
import {screenMediaRule} from "../../common/utils";

const useStyles = makeStyles(styles);

function IllsList(props) {
  const {
    ills,
    onSelect,
    load,
    activeZone,
    collect,
    activeType,
    updateCallback,
    removeIllFromList,
    onUpdateDisease,
    hoofIlls,
  } = props;
  const classes = useStyles();
  const {props: colorTheme} = useTheme();
  const [open, setOpen] = useState(false);

  const openAddIll = useCallback(() => setOpen(true), []);
  const closeAddIll = useCallback(() => setOpen(false), []);

  return (
    <Paper
      elevation={0}
      className={classes.illsListRoot}>
      <div className={classes.loadContainer}>
        {load ? <LinearLoader height={3} /> : <div className={classes.loadStumb} />}
      </div>
      <Box
        mb={2}
        className={classes.titleContainer}>
        <Box
          p={2}
          flexGrow={1}>
          <Text
            align="center"
            size={18}
            weight={500}>
            Список болезней
          </Text>
        </Box>
      </Box>
      {!activeZone ? (
        <Text
          align="center"
          size={16}
          weight={400}>
          Выберите зону копыта
        </Text>
      ) : null}
      <Box className={classes.illsList}>
        {Array.isArray(ills) && activeZone ? ills.map((ill, i) => {
          let isSelected;
          let _onSelect;
          let canRemove;
          if (updateCallback) {
            isSelected = hoofIlls[activeZone] && hoofIlls[activeZone].includes(ill.uuid);
            _onSelect = onUpdateDisease;
            canRemove = true;
          } else {
            isSelected = collect[activeType].some((el) => el?.diseaseId === ill.diseaseId);
            _onSelect = onSelect;
            canRemove = false;
          }
          return (
            <IllItem
              canRemove={canRemove}
              removeIllFromList={removeIllFromList}
              isSelected={Boolean(isSelected)}
              activeZone={activeZone}
              onSelect={_onSelect}
              key={String(i)}
              ill={ill} />
          );
        }) : null}
      </Box>
      {updateCallback && activeZone ? (
        <Fragment>
          <Box className={classes.addIllButton}>
            <CustomButton
              onClick={openAddIll}
              factor="square"
              bg={colorTheme.ORANGE}
              title="Добавить болезнь">
              <AddIcon />
            </CustomButton>
          </Box>
          <Modal
            open={open}
            onClose={closeAddIll}>
            <AddIll
              onClose={closeAddIll}
              updateIlls={updateCallback} />
          </Modal>
        </Fragment>
      ) : null}
    </Paper>
  );
}

IllsList.propTypes = {
  ills: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
  })),
  hoofIlls: PropTypes.shape({}),
  collect: PropTypes.shape({}),
  onSelect: PropTypes.func.isRequired,
  updateCallback: PropTypes.func,
  removeIllFromList: PropTypes.func,
  onUpdateDisease: PropTypes.func,
  load: PropTypes.bool.isRequired,
  activeZone: PropTypes.string,
  activeType: PropTypes.string,
};

export default memo(IllsList);
