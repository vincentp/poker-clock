import { createMuiTheme } from '@material-ui/core/styles';

export default createMuiTheme({
  typography: {
    useNextVariants: true,
  },  
  palette: {
    type: 'dark',
    primary: {
      main: '#395756'
    },
    secondary: {
      main: '#BFDBF7'
    },
    background: {
      default: '#00241B'
    }
  }
});