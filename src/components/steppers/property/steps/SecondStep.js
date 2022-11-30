import {
  memo, useCallback, useState,
} from "react";
import * as PropTypes from "prop-types";
import {makeStyles} from "@material-ui/styles";
import classnames from "classnames";
import {
  Box, InputAdornment, OutlinedInput, TextField,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropertyIcon from "../../../icons/property";
import TextFieldDropdown from "../../../inputs/TextFieldDropdown";
import Text from "../../../inputs/Text";
import styles from "../styles";
import CowIcon from "../../../icons/cow";
import KeepIcon from "../../../icons/keep";
import WavesIcon from "../../../icons/waves";
import LoginField from "../../../icons/loginField";

const keepingTypeOptions = [
  {
    label: "Привязное",
    value: "connected",
  },
  {
    label: "Беспривязное",
    value: "unconnected",
  },
];
const tanksOptions = [
  {
    label: "Нет",
    value: 0,
  },
  {
    label: "Да",
    value: 1,
  },
];

const useStyles = makeStyles(styles);

function SecondStep(props) {
  const {
    propertyType, setParam, active, managers,
  } = props;
  const classes = useStyles();
  const [option, setOption] = useState(null);

  const managersOptions = managers?.map((manager) => ({value: manager.uuid, label: manager.name}));

  const onChange = useCallback((name) => ({target: {value}}) => {
    let res = value;
    if (name === "heads") {
      res = Number(value);
    }
    setParam(name, res);
  }, []);

  const onSelect = useCallback((name) => (ev, target) => {
    setOption(target);
    if (target) {
      setParam(name, target?.value);
    } else {
      setParam(name, null);
    }
  }, [option]);

  if (propertyType === 0) {
    return (
      <div className={classes.stepItem}>
        <Box
          mt={2}
          mb={4.5}>
          <Text
            align="center"
            weight={700}
            size={20} >
            Заполните параметры хозяйства
          </Text>
        </Box>
        <div
          className={classnames(classes.stepWrapper, {
            [classes.unactiveStep]: !active,
          })}>
          <OutlinedInput
            type="text"
            className={classes.textFieldRoot}
            placeholder="Наименование хозяйства"
            onChange={onChange("title")}
            startAdornment={(
              <InputAdornment position="start">
                <PropertyIcon />
              </InputAdornment>
            )} />
          <Box mt={2}>
            <Autocomplete
              onChange={onSelect("managerId")}
              options={managersOptions}
              className={classes.autocompleteStyle}
              getOptionSelected={(opt, item) => opt.value === item.value}
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
                  placeholder="Выберите менеджера"
                  variant="outlined" />
              )} />
          </Box>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.stepItem}>
      <Box
        mt={2}
        mb={4.5}>
        <Text
          align="center"
          weight={700}
          size={20} >
          Заполните параметры коровника
        </Text>
      </Box>
      <div
        className={classnames(classes.stepWrapper, {
          [classes.unactiveStep]: !active,
        })}>
        <OutlinedInput
          type="text"
          className={classes.textFieldRoot}
          placeholder="Наименование коровника"
          onChange={onChange("title")}
          startAdornment={(
            <InputAdornment position="start">
              <CowIcon />
            </InputAdornment>
          )} />
        <Box mt={2}>
          <OutlinedInput
            type="number"
            className={classes.textFieldRoot}
            placeholder="Количество голов"
            onChange={onChange("heads")}
            inputProps={{
              min: 0,
            }}
            startAdornment={(
              <InputAdornment position="start">
                <CowIcon />
              </InputAdornment>
            )} />
        </Box>
        <Box mt={2}>
          <TextFieldDropdown
            options={keepingTypeOptions}
            fieldName="keepingType"
            placeholder="Тип содержания"
            onChange={setParam}
            Icon={KeepIcon} />
        </Box>
        <Box mt={2}>
          <TextFieldDropdown
            options={tanksOptions}
            fieldName="tanks"
            placeholder="Ванны"
            onChange={setParam}
            Icon={WavesIcon} />
        </Box>
      </div>
    </div>
  );
}

SecondStep.propTypes = {
  propertyType: PropTypes.number,
  setParam: PropTypes.func,
  active: PropTypes.bool,
  managers: PropTypes.arrayOf(PropTypes.shape({

  })),
};

export default memo(SecondStep);
