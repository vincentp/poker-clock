import common from "../../common/styles";

export default {

  circle: {
    position: 'fixed',
    top: '5%',
    border: {
      size: '1px',
      style: 'solid',
      color: common.colors.text,
      radius: '50%'
    },
    textAlign: 'center',
    color: common.colors.text
  },
  hidden: {
    visibility: "hidden"
  },
  content: {
    marginTop: '10px'
  },
  blindsTitle: {
    color: common.colors.title,
    fontSize: 'calc(14px + 2vmin)',
    lineHeight: common.lineHeight,
    textTransform: "uppercase"
  },
  blindsValues: {
    display: 'block',
    width: '100%',
    marginTop: '-15px',
    fontSize: 'calc(22px + 2vmin)',
    lineHeight: common.lineHeight
  },
  clock: {
    display: 'block',
    width: '100%',
    margin: 'calc(20px + 2vmin) 0 0 0',
    fontSize: '3vw',
    lineHeight: common.lineHeight
  },
  timer: {
    display: 'block',
    width: '100%',
    fontSize: '8vw',
    lineHeight: common.lineHeight
  },
  actions: {
    position: "absolute",
    width: "100%",
    bottom: "calc(20px + 2vmin)",
    "& .primary": {
      ...common.elements.primaryBtn
    }
  }

};