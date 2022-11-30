import Paper from "@material-ui/core/Paper";
import * as PropTypes from "prop-types";

function UserCard({data}) {
  return (
    <Paper elevation={0}>
      {JSON.stringify(data)}
    </Paper>
  );
}

UserCard.propTypes = {
  data: PropTypes.shape({
    uuid: PropTypes.string,
  }),
};

export default UserCard;
