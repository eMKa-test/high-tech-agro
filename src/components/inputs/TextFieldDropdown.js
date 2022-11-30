import {
  memo, useCallback, useEffect, useState,
} from "react";
import * as PropTypes from "prop-types";
import {Box, Select, MenuItem} from "@material-ui/core";
import {makeStyles} from "@material-ui/styles";
import ExpandMore from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import {textFieldDropdownStyles as styles} from "./styles";

const useStyles = makeStyles(styles);

function formOptions(arr) {
  return arr.map((opt, idx) => ({
    label: opt.label || opt.title,
    value: opt.value || opt.uuid || opt.id || idx,
  }));
}

function TextFieldDropdown(props) {
  const {
    placeholder = "",
    onChange,
    Icon = EditIcon,
    options = [],
    autoWidth = false,
    fieldName = "",
    initialValue = -1,
    disabled = false,
    error = false,
  } = props;
  const classes = useStyles();

  const [_options, setOptions] = useState(() => formOptions(options));
  const [selected, setSelected] = useState(initialValue);

  useEffect(() => {
    setOptions(formOptions(options));
    if (initialValue !== -1) {
      setSelected(initialValue);
    }
  }, [options]);

  const _onChange = useCallback(({target: {value}}) => {
    setSelected(value);
    if (typeof onChange === "function") {
      const select = _options.find((opt) => value === opt.value);
      if (select) {
        return onChange(fieldName, select.value);
      }
      const result = value === -1 ? null : value;
      return onChange(fieldName, result);
    }
    return null;
  }, [onChange, _options]);

  return (
    <Box position="relative">
      <Box className={classes.iconStyle}>
        <Icon />
      </Box>
      <Select
        error={error}
        disabled={disabled}
        MenuProps={{
          getContentAnchorEl: null,
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "left",
          },
        }}
        className={classes.rootSelect}
        name={fieldName}
        autoWidth={autoWidth}
        variant="outlined"
        IconComponent={ExpandMore}
        value={selected}
        onChange={_onChange}>
        {placeholder ? (
          <MenuItem
            value={-1}
            className={classes.optionStyle}>
            {placeholder}
          </MenuItem>
        ) : null}
        {Array.isArray(_options) ? (
          _options.map(({label, value}) => (
            <MenuItem
              key={value}
              className={classes.optionStyle}
              value={value}>
              {label}
            </MenuItem>
          ))
        ) : null}
      </Select>
    </Box>
  );
}

TextFieldDropdown.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  Icon: PropTypes.any,
  autoWidth: PropTypes.bool,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  fieldName: PropTypes.string,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
      label: PropTypes.string,
    }))]),
};

export default memo(TextFieldDropdown);
