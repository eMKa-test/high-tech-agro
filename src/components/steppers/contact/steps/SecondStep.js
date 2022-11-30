import {
  memo, useCallback, useEffect, useState,
} from "react";
import * as PropTypes from "prop-types";
import {Box, TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {makeStyles} from "@material-ui/styles";
import classnames from "classnames";
import PropertyIcon from "../../../icons/property";
import TextFieldDropdown from "../../../inputs/TextFieldDropdown";
import Text from "../../../inputs/Text";
import styles from "../styles";
import {getOptions} from "../../helpers";
import CowIcon from "../../../icons/cow";

const useStyles = makeStyles(styles);

const propertyOptions = [
  {
    value: "Farm",
    label: "Хозяйство",
  },
  {
    value: "Barn",
    label: "Коровник",
  },
];

function secondStep(props) {
  const {
    setParam, properties, active, title = "Выберите тип объекта",
  } = props;
  const classes = useStyles();
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState(null);
  const [select, setSelect] = useState("Farm");

  useEffect(() => {
    setOptions(getOptions(properties[select]));
  }, [properties, select]);

  const onSelect = useCallback((ev, target) => {
    setOption(target);
    if (target) {
      setParam("id", target?.value);
      setParam("bind", select);
    } else {
      setParam("id", null);
      setParam("bind", null);
    }
  }, [select, options]);

  const handleChange = useCallback((_, value) => {
    setOption(null);
    setSelect(value);
    setParam("id", null);
    setParam("bind", null);
  }, [properties]);

  const isFarm = select === "Farm";

  return (
    <div className={classes.stepItem}>
      <Box
        mt={2}
        mb={4.5}>
        <Text
          align="center"
          weight={700}
          size={20} >
          {title}
        </Text>
      </Box>
      <div
        className={classnames(classes.stepWrapper, {
          [classes.unactiveStep]: !active,
        })}>
        <Box mb={2}>
          <TextFieldDropdown
            initialValue="Farm"
            onChange={handleChange}
            Icon={isFarm ? PropertyIcon : CowIcon}
            options={propertyOptions} />
        </Box>
        <Autocomplete
          onChange={onSelect}
          options={options}
          value={option}
          freeSolo
          className={classes.autocompleteStyle}
          getOptionSelected={(opt, item) => opt.label === item.label}
          getOptionLabel={(opt) => opt.label}
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.textFieldRootAutocomplete}
              placeholder={isFarm ? "Выберите хозяйство" : "Выберите коровник"}
              variant="outlined" />
          )} />
      </div>
    </div>
  );
}

secondStep.propTypes = {
  setParam: PropTypes.func.isRequired,
  farms: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
  })),
  barns: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
  })),
  active: PropTypes.bool,
  setProperty: PropTypes.func,
};

export default memo(secondStep);
