import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    appBarBackGround: '#24292e'
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System'
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  formContainer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    padding: 5
  },
  submitBtn: {
    borderWidth: 1,
    borderRadius: 2,
    margin: 4,
    padding: 13,
    backgroundColor: 'blue'
  },
  submitBtnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
};

export default theme;