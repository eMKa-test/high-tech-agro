import {memo} from "react";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/styles";
import {Box} from "@material-ui/core";
import styles from "./styles";
import Text from "../../inputs/Text";
import GridItem from "./GridItem";
import {screenMediaRule} from "../../../common/utils";
import ViewTitle from "../../ViewTitle";

const useStyles = makeStyles(styles);

function ContactsRow(props) {
  const {contacts, updateContacts} = props;
  const classes = useStyles();
  const media = screenMediaRule(836);

  return contacts.map(({title, items}) => (
    <Box
      className={classes.propertiesContacts}
      key={title}>
      <Box
        ml={media ? 2 : 0}
        mt={media ? 4 : 0}
        mb={1}>
        <ViewTitle text={title} />
      </Box>
      {items?.length > 0 ? (
        <Box
          display="flex"
          flexWrap="wrap">
          <GridItem
            updateContacts={updateContacts}
            contacts={items} />
        </Box>
      ) : (
        <Box
          mt={media ? 4 : 0}
          ml={2}>
          <Text
            weight={300}
            size={26}>
            Контакты не найдены
          </Text>
        </Box>
      )}
    </Box>
  ));
}

ContactsRow.propTypes = {
  updateContacts: PropTypes.func.isRequired,
};

export default memo(ContactsRow);
