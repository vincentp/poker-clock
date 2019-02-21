import common from "../../common/styles";

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
    backgroundColor: 'white',
    '& td': {
      color: common.colors.darkText
    }
  },
  cell: {
    color: common.colors.text,
    border: 0,
    padding: '0 10px !important'
  },
  settings: {
    color: common.colors.link
  }

};