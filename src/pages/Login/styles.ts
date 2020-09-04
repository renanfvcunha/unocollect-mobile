import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  squaresTop: {
    width: '100%',
    height: 100,
    position: 'absolute',
    top: 0,
  },
  squaresBottom: {
    width: '100%',
    height: 100,
    position: 'absolute',
    bottom: 0,
  },
  logoImg: {
    width: 250,
    height: 250,
    marginVertical: 16,
  },
  loginBox: {
    width: '75%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  textInput: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(56, 53, 53, 0.5)',
  },
  input: {
    fontSize: 20,
    marginLeft: 12,
  },
  subButton: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#ffb855',
    borderRadius: 8,
    paddingVertical: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  subButtonText: {
    color: '#383636',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
  },
});

export default styles;
