import {memo, Fragment} from "react";
import * as PropTypes from "prop-types";
import {Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import GridItem from "./GridItem";
import styles from "./styles";
import ContactsRow from "./ContactsRow";
import NoData from "../../NoData/NoData";

const useStyles = makeStyles(styles);

function ContactCard(props) {
  const {
    contacts, contactsGrid, load, children, updateContacts,
  } = props;
  const classes = useStyles();

  if (contacts?.length === 0 && contactsGrid?.length === 0 && !load) {
    return <NoData type="contact" />;
  }
  if (contactsGrid) {
    return (
      <ContactsRow
        updateContacts={updateContacts}
        contacts={contactsGrid} />
    );
  }

  return (
    <Fragment>
      <div className={classes.gridWrapper}>
        <Box className={classes.responsiveContactWrapper}>
          <Box className={classes.contactCardsWrapper}>
            <GridItem
              updateContacts={updateContacts}
              contacts={contacts} />
          </Box>
        </Box>
        <Box className={classes.contactPagination}>
          {children}
        </Box>
      </div>
    </Fragment>
  );
}
ContactCard.propTypes = {
  updateContacts: PropTypes.func.isRequired,
  load: PropTypes.bool.isRequired,
  contacts: PropTypes.any,
  contactsGrid: PropTypes.any,
  children: PropTypes.node,
};

export default memo(ContactCard);
