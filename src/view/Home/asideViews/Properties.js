import {
  memo, useCallback, useEffect, useState,
} from "react";
import * as PropTypes from "prop-types";
import {useTheme, makeStyles} from "@material-ui/styles";
import {Box} from "@material-ui/core";
import {useRouteMatch} from "react-router-dom";
import Text from "../../../components/inputs/Text";
import CustomButton from "../../../components/inputs/CustomButton";
import AddRoundIcon from "../../../components/icons/add_round";
import PropertiesList from "../../../components/Properties";
import styles from "../styles";
import Modal from "../../../components/modals/modal";
import Stepper from "../../../components/steppers";
import eventEmitter from "../../../common/utils/emitter";

const useStyles = makeStyles(styles);

function Properties(props) {
  const {closeDrawer} = props;
  const {props: colorTheme} = useTheme();
  const classes = useStyles();
  const [modal, setModal] = useState(false);

  const openModal = useCallback(() => setModal(true), []);
  const closeModal = useCallback(() => setModal(false), []);
  const match = useRouteMatch("/:routeType");
  const isContactPage = match?.params?.routeType === "contacts";

  useEffect(() => {
    eventEmitter.on("addContact", openModal);
    return () => eventEmitter.off("addContact", openModal);
  }, []);

  return (
    <div>
      <CustomButton
        fullWidth
        extStyle={classes.asideActionButton}
        bg={colorTheme.ORANGE}
        onClick={openModal}>
        <Box
          display="flex"
          alignItems="center"
          mr={1}>
          <AddRoundIcon />
        </Box>
        <Text variant="body1">
          {isContactPage ? "Добавить контакт" : "Добавить хозяйство"}
        </Text>
      </CustomButton>
      <Box
        mt={7}
        ml={1}>
        <Text
          weight={700}
          variant="h6">
          Хозяйства
        </Text>
      </Box>
      <Box mt={1.5}>
        <PropertiesList closeDrawer={closeDrawer} />
      </Box>
      <Modal
        open={modal}
        onClose={closeModal}>
        <Stepper
          closeModal={closeModal}
          stepperType={match?.params?.routeType} />
      </Modal>
    </div>
  );
}

Properties.propTypes = {
  closeDrawer: PropTypes.func.isRequired,
};

export default memo(Properties);
