import theme from "../../common/theme";

export default {

  sidebar: {
    marginTop: '50px',
    maxWidth: '280px'
  },
  timers: {
    "& .fa-coins": {
      marginRight: '5px'
    }
  },
  selected: {
    backgroundColor: theme.palette.primary.contrastText,
    '& td': {
      color: theme.palette.primary.dark
    }
  },
  cell: {
    border: 0,
    padding: '0 10px !important'
  },
  settings: {
    fontSize: '16px',
  }

};