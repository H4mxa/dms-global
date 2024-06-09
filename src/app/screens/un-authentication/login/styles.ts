import {createStyleSheet} from '@theme';

export const styleSheet = createStyleSheet(theme => {
  return {
    container: {
      flex: 1,
      backgroundColor: '#1d9bf1',
      alignItems: 'center',
    },
    logo: {
      width: 100,
      height: 120,
    },
    inputBox: {
      backgroundColor: theme.color.background,
      borderRadius: 5,
      padding: 10,
    },
    loginButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.color.darkBlue,
      padding: 12,
      borderRadius: 5,
    },
    loginButtonText: {
      color: theme.color.white,
    },
    registerText: {
      fontSize: 12,
      marginRight: 8,
    },
    registerTextLink: {
      fontSize: 12,
      color: theme.color.white,
      textDecorationLine: 'underline',
    },
    mt4: {
      marginTop: 16,
    },
    mt5: {
      marginTop: 22,
    },
  };
});
