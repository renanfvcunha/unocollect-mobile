import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
    paddingTop: 16 + Constants.statusBarHeight,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  welcome: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  welcomeTitle: {
    fontSize: 40,
    fontWeight: '700',
    color: '#212121',
  },
  welcomeImg: {
    width: 64,
    height: 64,
  },
  title: {
    marginTop: 16,
    marginBottom: 24,
    fontSize: 30,
    fontWeight: '500',
    color: '#212121',
  },
  formBox: {
    marginTop: 8,
    backgroundColor: '#fff',
    width: '100%',
    paddingVertical: 8,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    elevation: 10,
  },
  formTitle: {
    paddingLeft: 8,
    fontSize: 24,
    fontWeight: '500',
  },
  formDescription: {
    paddingTop: 8,
    paddingLeft: 8,
    fontSize: 16,
    color: '#616161',
  },
});

export default styles;
