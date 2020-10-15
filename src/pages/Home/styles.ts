import { CSSProperties } from 'react';
import { StyleSheet } from 'react-native';

interface HTMLStyles {
  logoutButton: CSSProperties;
  logoutButtonText: CSSProperties;
  formBox: CSSProperties;
  formTitle: CSSProperties;
  formDescription: CSSProperties;
}

export const styles = StyleSheet.create({
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
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#2196f3',
    borderRadius: 16,
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
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#f44336',
    borderRadius: 16,
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

export const htmlStyles: HTMLStyles = {
  formBox: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 12,
    backgroundColor: '#ffb855',
    width: '100%',
    padding: 12,
    border: 0,
    boxShadow: '4px 4px 8px',
    borderRadius: 32,
    cursor: 'pointer',
  },
  formTitle: {
    color: '#fff',
    paddingLeft: 8,
    fontSize: 20,
    fontWeight: 700,
  },
  formDescription: {
    paddingTop: 8,
    paddingLeft: 8,
    fontSize: 16,
    color: '#393737',
  },
  logoutButton: {
    display: 'flex',
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#f44336',
    border: 0,
    borderRadius: 16,
    padding: '16px 0',
    marginTop: 24,
    marginBottom: 16,
    cursor: 'pointer',
  },
  logoutButtonText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 16,
    marginLeft: 16,
  },
};
