export default (theme) => ({
  rootUserProfile: {
    //
  },
  content: {
    display: "flex",
    alignItems: "center",
    "&:last-child": {
      padding: theme.spacing(0),
    },
  },
  avatar: {
    width: 57,
    height: 57,
    marginRight: 15,
  },
  menuButton: {
    color: "#D3D6E4",
  },
});
