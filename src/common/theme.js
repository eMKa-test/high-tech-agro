import {createMuiTheme, responsiveFontSizes} from "@material-ui/core/styles";
import {
  PRIMARY,
  SECONDARY,
  DIVIDER,
  TEXT_PRIMARY,
  TEXT_SECONDARY,
  TEXT_DISABLED,
  appBarHeight,
  ORANGE,
  BLUE,
  GREY_DARK,
  GREY_LIGHT,
  GREY_HARD,
  GREY,
  BLUE_LIGHT,
  BLUE_LIGHTER,
  TEXT_PRIMARY_LIGHT,
  RED,
  drawerWidth,
  ERROR,
  DEFAULT,
} from "./themeConstants";

const fonts = {
  fontFamily: "Roboto, sans-serif",
};

let theme = createMuiTheme({
  direction: "ltr",
  typography: {
    fontFamily: fonts.fontFamily,
    body1: fonts,
    body2: fonts,
    caption: fonts,
    h4: fonts,
    h5: fonts,
    h6: fonts,
    button: {
      fontFamily: fonts.fontFamily,
      fontSize: "1rem",
      fontWeight: 700,
      lineHeight: 2.2,
      textTransform: "none",
    },
    fontSize: 16,
  },
  spacing: 8,
  text: {
    primary: TEXT_PRIMARY,
    secondary: TEXT_SECONDARY,
    disabled: TEXT_DISABLED,
    hint: TEXT_DISABLED,
  },
  palette: {
    type: "light",
    common: {
      black: "#000",
      white: "#fff",
    },
    primary: PRIMARY,
    secondary: SECONDARY,
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  action: {
    active: "rgba(0, 0, 0, 0.54)",
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    disabled: "rgba(0, 0, 0, 0.26)",
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12,
  },
  shape: {
    borderRadius: 10,
  },
  transitions: {
    easing: {
      easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
      easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
      easeIn: "cubic-bezier(0.4, 0, 1, 1)",
      sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
    },
    duration: {
      shortest: 100,
      shorter: 150,
      short: 200,
      standard: 300,
      complex: 375,
      enteringScreen: 250,
      leavingScreen: 180,
    },
  },
  divider: DIVIDER,
  props: {
    ORANGE,
    BLUE,
    GREY,
    GREY_DARK,
    GREY_LIGHT,
    GREY_HARD,
    BLUE_LIGHT,
    BLUE_LIGHTER,
    RED,
    TEXT_PRIMARY_LIGHT,
    ERROR,
    DEFAULT,
  },
  breakpoints: {
    values: {
      xs: 320,
      sm: 830,
      md: 1025,
      lg: 1280,
      xl: 1920,
    },
  },
  mixins: {
    toolbar: {
      minHeight: appBarHeight,
    },
    drawer: {
      width: drawerWidth,
    },
  },
});

const overrides = {
  overrides: {
    MuiDrawer: {
      root: {
        //
      },
    },
    MuiPaper: {
      root: {
        //
      },
    },
    MuiList: {
      root: {
        "& .MuiListItem-root.Mui-selected": {
          fontWeight: 500,
        },
      },
    },
    MuiTypography: {
      h5: {
        [theme.breakpoints.up("md")]: {
          fontSize: "1.375rem",
        },
        [theme.breakpoints.up("xs")]: {
          fontSize: "1.25rem",
        },
      },
      h6: {
        "@media (min-width:1024px) and (max-width: 1960px)": {
          fontSize: "1.25rem",
        },
        "@media (min-width:0px) and (max-width: 1023px)": {
          fontSize: "1.125rem",
        },
      },
      body2: {
        "@media (min-width:1024px)": {
          fontSize: "1rem",
        },
        "@media (min-width:0px) and (max-width: 1023px)": {
          fontSize: "0.9375rem",
        },
      },
      body1: {
        "@media (min-width:1024px)": {
          fontSize: "1.1667rem",
        },
        "@media (min-width:0px) and (max-width: 1023px)": {
          fontSize: "1rem",
        },
      },
    },
    MuiListItem: {
      root: {
        //
      },
    },
    MuiOutlinedInput: {
      root: {
        "&$focused $notchedOutline": {
          borderColor: "transparent",
          borderWidth: 1,
        },
      },
      input: {
        padding: "inherit",
        height: "auto",
      },
    },
    MuiSelect: {
      root: {
        height: 48,
      },
      select: {
        "&:focus": {
          backgroundColor: "transparent",
        },
      },
      selectMenu: {
        height: 48,
        display: "flex",
        alignItems: "center",
      },
      icon: {
        color: "#025FA3",
        top: "calc(50% - 15px)",
      },
      nativeInput: {
        height: "100%",
      },
    },
    MuiButton: {
      root: {
        borderRadius: 10,
        fontSize: "1rem",
        minWidth: "auto",
      },
      contained: {
        boxShadow: "none",
        "&:hover, &:active": {
          boxShadow: "none",
        },
        "&:disabled": {
          color: "rgba(255, 255, 255, 1)",
          backgroundColor: "#BABABA",
          "& .MuiSvgIcon-root": {
            stroke: "#fff",
            "& path": {
              fill: "#fff",
            },
          },
        },
      },
      sizeSmall: {
        fontSize: "0.8rem",
      },
      sizeLarge: {
        fontSize: "1.2rem",
      },
      iconSizeSmall: {
        "& .MuiSvgIcon-root": {
          width: "0.9rem",
          height: "0.9rem",
        },
      },
      iconSizeLarge: {
        "& .MuiSvgIcon-root": {
          width: "1.25rem",
          height: "1.25rem",
        },
      },
    },
    MuiPickersCalendarHeader: {
      switchHeader: {
        marginBottom: 30,
      },
      dayLabel: {
        textTransform: "uppercase",
        color: TEXT_PRIMARY,
        fontSize: 14,
        fontWeight: 400,
      },
      transitionContainer: {
        "& .MuiTypography-body1": {
          fontWeight: 500,
          textTransform: "capitalize",
        },
      },
    },
    MuiPickersDay: {
      day: {
        borderRadius: 10,
        color: TEXT_PRIMARY,
      },
      hidden: {
        color: TEXT_DISABLED,
        opacity: 1,
      },
      daySelected: {
        borderRadius: 10,
        backgroundColor: ORANGE.main,
        color: "#fff",
        "&:hover": {
          backgroundColor: ORANGE.dark,
          color: "#fff",
        },
      },
      dayDisabled: {
        color: TEXT_DISABLED,
      },
      current: {
        color: ORANGE.main,
      },
    },
    MuiPickersModal: {
      dialogRoot: {
        padding: "10px 0",
      },

    },
  },
};

Object.assign(theme, overrides);

const responsiveOptions = {
  breakpoints: ["sm", "md", "lg"],
  factor: 2,
};
theme = responsiveFontSizes(theme, responsiveOptions);

export default theme;
