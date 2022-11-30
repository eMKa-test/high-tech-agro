import {
  lazy, useCallback, useEffect, useState,
} from "react";
import {makeStyles, Box} from "@material-ui/core";
import Users from "../../components/Users";
import {getData} from "../../common/api/request";
import {USERS_LIMIT} from "../../common/vars";

const ViewWrapper = lazy(() => import("../../components/ViewWrapper"));
const ViewTitle = lazy(() => import("../../components/ViewTitle"));

const useStyles = makeStyles((theme) => ({
  container: {
    marginLeft: 0,
  },
  title: {
    marginTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down("xs")]: {
      margin: theme.spacing(2, 0),
    },
  },
}));

function UserListView() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [list, setUsers] = useState([]);

  const getUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getData("/users", {params: {binds: true, limit: USERS_LIMIT}});
      if (response?.payload) {
        setUsers(response.payload);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(getUsers, []);

  return (
    <ViewWrapper loading={loading}>
      <Box className={classes.title}>
        <ViewTitle text="Настройка пользователей" />
      </Box>
      {list?.length > 0 ? (
        <Users
          updateUsers={getUsers}
          list={list} />
      ) : null}
    </ViewWrapper>
  );
}

export default UserListView;
