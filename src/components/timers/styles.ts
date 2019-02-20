import common from "../../common/styles";

export default {
  timers: {
    minHeight: "100%",
    backgroundColor: common.colors.background,
    color: common.colors.text
  },
  back: {
    display: "inline-block",
    margin: "10px 0 20px 10px",
    "& i": {
      marginRight: "5px"
    }
  },
  cell: {
    color: common.colors.text,
    border: 0
  },
  textField: {
    width: "100%",
    "& input": {
      color: common.colors.text
    },
    "& :before": {
      borderColor: common.colors.text
    }
  },
  button: {
    marginRight: "5px"
  }
};
