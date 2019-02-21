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
    textAlign: 'center'
  },
  hidden: {
    visibility: "hidden"
  },
  blindsTitle: {
    position: 'absolute',
    top: '2%',
    width: '100%',
    color: common.colors.title,
    fontSize: '7vh',
    textTransform: "uppercase"
  },
  blindsValues: {
    position: 'absolute',
    top: '10%',
    width: '100%',
    fontSize: '7vh',
    color: common.colors.text
  },
  clock: {
    position: 'absolute',
    top: '26%',
    width: '100%',
    fontSize: '7vh',
    color: common.colors.text
  },
  timer: {
    position: 'absolute',
    top: '50%',
    marginTop: '-12vh',
    display: 'block',
    width: '100%',
    fontSize: '18vh',
    color: common.colors.text
  },
  startButton: {
    position: 'absolute',
    top: '70%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    fontSize: '6vh',
    padding: '1vh 6vh',
    ...common.elements.primaryBtn
  },
  resetButton: {
    position: 'absolute',
    top: '89%',
    left: '50%',
    transform: 'translate(-50%, 0)',
    fontSize: '2vh',
    padding: '1vh 4vh',
  }

};