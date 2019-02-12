import common from "../../common/styles";

export default {

  circle: {
    position: 'fixed',
    top: '5%',
    left: '50%',
    border: {
      size: '1px',
      style: 'solid',
      color: common.colors.text,
      radius: '50%'
    },
    textAlign: 'center',
    color: common.colors.text
  },
  content: {
    position: 'relative',
    top: '50%',
    marginTop: 'calc(-240px + 2vmin)'
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
    marginTop: '-20px',
    fontSize: 'calc(22px + 2vmin)',
    lineHeight: common.lineHeight
  },
  clock: {
    display: 'block',
    width: '100%',
    margin: '20px 0 0 0',
    fontSize: 'calc(14px + 2vmin)',
    lineHeight: common.lineHeight
  },
  timer: {
    display: 'block',
    width: '100%',
    fontSize: 'calc(80px + 2vmin)',
    lineHeight: common.lineHeight
  },
  actions: {
    position: "absolute",
    width: "100%",
    bottom: "20px",
    "& .primary": {
      ...common.elements.primaryBtn
    }
  }

};