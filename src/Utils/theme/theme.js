import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { COLORS } from '../Colors/color';

// Create a theme instance.
const theme = createMuiTheme({
  typography: {
    // fontFamily: 'Aristotelica SemiBold',
    // fontWeightBold: 'Aristotelica SemiBold'
  },
  palette: {
    primary: {
      main: COLORS.PRIMARY,
      contrastText: COLORS.WHITE,
    },
    secondary: {
      main: COLORS.SECONDARY,
    },
    error: {
      main: COLORS.ERROR,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
