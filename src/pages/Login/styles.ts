import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '25%',
  },
  logoImg: {
    width: 250,
    height: 250,
    marginTop: 16,
    marginBottom: 16,
  },
  welcomeTxt: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 8,
  },
  welcomeLoginTxt: {
    fontSize: 16,
    marginBottom: 48,
  },
  textInput: {
    flexDirection: 'row',
    width: '75%',
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    fontSize: 20,
    marginLeft: 16,
  },
  subButton: {
    width: '75%',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    backgroundColor: '#2196f3',
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  subButtonText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 16,
    marginLeft: 16,
  },
});

export default styles;
