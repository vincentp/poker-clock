import common from "../../common/styles";

export default {

  circle: {
    position: 'fixed',
    top: '5%',
    left: '50%',
    border: '1px solid white',
    borderRadius: '50%',
    textAlign: 'center',
    color: common.colors.text
  },
  content: {
    position: 'relative',
    top: '50%',
    marginTop: 'calc(-80px + 2vmin)'
  },
  timer: {
    display: 'block',
    width: '100%',
    fontSize: 'calc(80px + 2vmin)'
  },
  clock: {
    display: 'block',
    width: '100%',
    fontSize: 'calc(20px + 2vmin)'
  },
  toggle: {
    ...common.elements.btn
  },
  reset: {
    
  }

};