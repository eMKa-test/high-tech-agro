import {
  memo, useState, useEffect, useCallback,
} from "react";
import {makeStyles} from "@material-ui/styles";
import {isLaptop} from "../../common/utils";
import styles from "./styles";
import Aside from "../../layout/aside";
import Header from "../../layout/header";
import AsideRouter from "../../routes/AsideRouter";
import ContentRouter from "../../routes/ContentRouter";
import eventEmitter from "../../common/utils/emitter";
import Modal from "../../components/modals/modal";
import AddCow from "../../components/Cards/AddCow";

const useStyles = makeStyles(styles);

function HomePage() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [addCow, setOpenAddCow] = useState(false);
  const desktop = !isLaptop();

  useEffect(() => {
    if (open && desktop) {
      setOpen(false);
    }
  }, [desktop, open]);

  const openDrawer = useCallback(() => setOpen(true), []);
  const closeDrawer = useCallback(() => setOpen(false), []);

  const openAddCow = useCallback(() => setOpenAddCow(true), []);
  const closeAddCow = useCallback(() => setOpenAddCow(false), []);

  useEffect(() => {
    eventEmitter.on("addCow", openAddCow);
    return () => eventEmitter.off("addCow", openAddCow);
  }, []);

  return (
    <div className={classes.rootAdmin}>
      <Header
        openAside={openDrawer}
        desktop={desktop}
        open={open} />
      <Aside
        dismiss={closeDrawer}
        desktop={desktop}
        open={open}>
        <AsideRouter
          closeAddCow={closeAddCow}
          addCow={addCow}
          openAddCow={openAddCow}
          closeDrawer={closeDrawer} />
      </Aside>
      <div className={classes.contentWrapper}>
        <ContentRouter
          closeAddCow={closeAddCow}
          addCow={addCow}
          openAddCow={openAddCow} />
      </div>
      <Modal
        open={addCow}
        onClose={closeAddCow}>
        <AddCow onClose={closeAddCow} />
      </Modal>
    </div>
  );
}

export default memo(HomePage);
