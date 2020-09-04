import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  content: {
    paddingTop: 100,
    paddingHorizontal: '10%',
  },
  welcome: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffb855',
  },
  welcomeImg: {
    width: 64,
    height: 64,
  },
  title: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 24,
    fontWeight: '500',
    color: '#fff',
  },
  formBox: {
    marginTop: 12,
    backgroundColor: '#ffb855',
    width: '100%',
    padding: 12,
    borderRadius: 32,
    elevation: 8,
  },
  formTitle: {
    color: '#fff',
    paddingLeft: 8,
    fontSize: 20,
    fontWeight: '700',
  },
  formDescription: {
    paddingTop: 8,
    paddingLeft: 8,
    fontSize: 16,
    color: '#393737',
  },
  noFormText: {
    fontSize: 16,
    color: '#fff',
  },
  refreshButton: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#2196f3',
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  refreshButtonText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 16,
    marginLeft: 16,
  },
  logoutButton: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#f44336',
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 24,
    marginBottom: 16,
  },
  logoutButtonText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 16,
    marginLeft: 16,
  },
});

export default styles;
