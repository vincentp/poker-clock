import common from "../../common/styles";

export default {

  timers: {
    minHeight: '100%',
    backgroundColor: common.colors.background,    
    color: common.colors.text,
    "& table, & table thead th": {
      background: 'none !important',
      color: (common.colors.text + ' !important')
    }
  },
  back: {
    display: "inline-block",
    margin: '10px 0 20px 10px',
    "& i": {
      marginRight: "5px"
    }
  }

};