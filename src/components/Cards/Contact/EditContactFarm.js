import {memo, useCallback} from "react";
import * as PropTypes from "prop-types";
import {useTheme, makeStyles} from "@material-ui/styles";
import {
  Box, Chip, InputAdornment, TextField,
} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import styles from "./styles";
import Text from "../../inputs/Text";
import LoginField from "../../icons/loginField";

const useStyles = makeStyles(styles);

function EditContactFarm(props) {
  const {
    properties, selected, onSelect, disableSelect,
  } = props;
  const {text} = useTheme();
  const classes = useStyles();

  const onDelete = useCallback((value) => () => {
    if (disableSelect) {
      return null;
    }
    onSelect(null, value, "remove");
  }, [onSelect, disableSelect]);

  return (
    <div>
      <Box
        mt={2}
        mb={4.5}>
        <Text
          align="center"
          weight={700}
          size={20} >
          Изменение хозяйств контакта
        </Text>
        <Box
          className={classes.farmsSelectStyle}
          mt={2}>
          <Autocomplete
            freeSolo
            disabled={disableSelect}
            onChange={onSelect}
            options={properties}
            className={classes.autocompleteStyle}
            renderOption={(opt) => (
              <Text
                color={text.primary}
                weight={400}
                size={14}>
                {opt.label}
              </Text>
            )}
            getOptionLabel={(opt) => opt.label}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <InputAdornment position="start">
                      <LoginField />
                    </InputAdornment>
                  ),
                }}
                className={classes.textFieldRootAutocomplete}
                placeholder="Список хозяйств"
                variant="outlined" />
            )} />
          <Box className={classes.chipsWrapper}>
            {selected.map((el) => (
              <Chip
                className={classes.chipStyle}
                key={el.value}
                label={el.label}
                onDelete={onDelete(el)} />
            ))}
          </Box>
        </Box>
      </Box>
    </div>
  );
}

EditContactFarm.propTypes = {
  onSelect: PropTypes.func,
  selected: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    bind: PropTypes.string,
  })),
  properties: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
    bind: PropTypes.string,
  })),
  disableSelect: PropTypes.bool.isRequired,
};

export default memo(EditContactFarm);
