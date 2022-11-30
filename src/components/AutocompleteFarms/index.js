import {
  memo, useCallback, useContext, useEffect, useState,
} from "react";
import * as PropTypes from "prop-types";
import {useTheme, makeStyles} from "@material-ui/styles";
import {
  Box, Chip, InputAdornment, TextField,
} from "@material-ui/core";
import {Autocomplete} from "@material-ui/lab";
import {useSnackbar} from "notistack";
import styles from "./styles";
import Text from "../inputs/Text";
import LoginField from "../icons/loginField";
import {ERRORS} from "../../common/vars";
import {postData} from "../../common/api/request";
import {FarmsContext} from "../../providers/Farms";
import {getOptions} from "../steppers/helpers";

const useStyles = makeStyles(styles);

function AutocompleteFarms(props) {
  const {user, updateUsers} = props;
  const {text} = useTheme();
  const classes = useStyles();
  const {enqueueSnackbar: openBar} = useSnackbar();
  const {farms} = useContext(FarmsContext);
  const [properties, setProperties] = useState([]);
  const [loadFetch, setLoad] = useState(false);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    if (farms?.length > 0) {
      const result = getOptions(farms);
      setProperties(result);
    }
  }, [farms]);

  useEffect(() => {
    if (user?.binds?.length > 0) {
      const result = getOptions(user.binds);
      setSelected(result);
    }
  }, [user?.binds]);

  const userFetch = useCallback(async (body) => {
    try {
      const url = `/users/${user.uuid}`;
      setLoad(true);
      await postData(url, {body});
      return await updateUsers();
    } catch (err) {
      console.error(err);
      openBar(err.message || ERRORS.UNKNOWN, {variant: "error"});
    } finally {
      setLoad(false);
    }
    return null;
  }, [user, updateUsers]);

  const _onChange = useCallback((_, target) => {
    if (target) {
      const body = {
        bind: target.value,
      };
      userFetch(body).then(() => {
        const newSelected = [...selected, target];
        setSelected(newSelected);
      });
    }
  }, [farms, selected]);

  const onDelete = useCallback((target) => () => {
    const body = {
      unbind: target.value,
    };
    userFetch(body).then(() => {
      const newSelected = selected.filter((el) => el.value !== target.value);
      setSelected(newSelected);
    });
  }, [selected]);

  return (
    <div className={classes.rootEditProperty}>
      <Box mb={3}>
        <Text
          align="center"
          size={20}
          weight={700}>
          Изменение привязки менеджеров
        </Text>
      </Box>
      <Box
        className={classes.farmsSelectStyle}
        mt={2}>
        <Autocomplete
          noOptionsText="Список пуст"
          disabled={loadFetch}
          onChange={_onChange}
          options={properties}
          getOptionDisabled={(opt) => {
            const filtered = selected.map((item) => item?.value);
            return filtered.includes(opt.value);
          }}
          className={classes.autocompleteStyle}
          renderOption={(opt) => (
            <Text
              color={text.primary}
              weight={400}
              size={14}>
              {opt?.label}
            </Text>
          )}
          getOptionLabel={(opt) => opt?.label}
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
      </Box>
      <Box className={classes.chipsWrapper}>
        {selected?.map((el) => (
          <Chip
            disabled={loadFetch}
            className={classes.chipStyle}
            key={el?.value}
            label={el?.label}
            onDelete={onDelete(el)} />
        ))}
      </Box>
    </div>
  );
}

AutocompleteFarms.propTypes = {
  updateUsers: PropTypes.func,
  user: PropTypes.shape({
    uuid: PropTypes.string,
    binds: PropTypes.arrayOf(PropTypes.shape({
      uuid: PropTypes.string,
    })),
  }),
};

export default memo(AutocompleteFarms);
