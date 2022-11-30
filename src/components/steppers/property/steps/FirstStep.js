import {memo, useCallback} from "react";
import * as PropTypes from "prop-types";
import {
  Box, TextField, InputAdornment, OutlinedInput,
} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import classnames from "classnames";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropertyIcon from "../../../icons/property";
import TextFieldDropdown from "../../../inputs/TextFieldDropdown";
import {getOptions} from "../../helpers";
import Text from "../../../inputs/Text";
import styles from "../styles";
import CowIcon from "../../../icons/cow";
import GPSFilledIcon from "../../../icons/gpsFilled";

export const initialOptions = [
  {
    value: 0,
    label: "Хозяйство",
    icon: PropertyIcon,
  },
  {
    value: 1,
    label: "Коровник",
    icon: CowIcon,
  },
];

const useStyles = makeStyles(styles);

function FirstStep(props) {
  const {
    setParam, farms, propertyType, setProperty, active, card,
  } = props;
  const classes = useStyles();

  const onSelect = useCallback((name) => (ev, target) => {
    if (target) {
      setParam(name, target?.value);
    } else {
      setParam(name, null);
    }
  }, []);

  return (
    <div className={classes.stepItem}>
      <Box
        mt={2}
        mb={4.5}>
        <Text
          align="center"
          weight={700}
          size={20} >
          Выберите тип объекта
        </Text>
      </Box>
      <div
        className={classnames(classes.stepWrapper, {
          [classes.unactiveStep]: !active,
        })}>
        <TextFieldDropdown
          initialValue={propertyType}
          onChange={setProperty}
          Icon={initialOptions[propertyType].icon}
          options={initialOptions} />
        {propertyType === 1 ? (
          <Box mt={2}>
            <Autocomplete
              onChange={onSelect("farmId")}
              options={getOptions(farms)}
              freeSolo
              className={classes.autocompleteStyle}
              getOptionSelected={(opt, item) => opt.label === item.label}
              getOptionLabel={(opt) => opt.label}
              renderInput={(params) => (
                <TextField
                  {...params}
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <PropertyIcon />
                      </InputAdornment>
                    ),
                  }}
                  className={classes.textFieldRootAutocomplete}
                  placeholder="Выберите хозяйство"
                  variant="outlined" />
              )} />
          </Box>
        ) : null}
        <Box mt={2}>
          <OutlinedInput
            type="text"
            value={card?.address || ""}
            className={classes.textFieldRoot}
            placeholder={propertyType === 0 ? "Адрес хозяйства" : "Адрес коровника"}
            onChange={({target: {value}}) => setParam("address", value)}
            startAdornment={(
              <InputAdornment position="start">
                <Box mr={1}>
                  <GPSFilledIcon />
                </Box>
              </InputAdornment>
            )} />
        </Box>
      </div>
    </div>
  );
}

FirstStep.propTypes = {
  setParam: PropTypes.func.isRequired,
  farms: PropTypes.arrayOf(PropTypes.shape({

  })),
  card: PropTypes.shape({
    address: PropTypes.string,
  }),
  propertyType: PropTypes.number,
  active: PropTypes.bool,
  setProperty: PropTypes.func,
};

export default memo(FirstStep);
