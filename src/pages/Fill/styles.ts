import { StyleSheet } from 'react-native';

interface HTMLStyles {
  subButton: React.CSSProperties;
  subButtonText: React.CSSProperties;
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
    paddingBottom: 36,
    paddingHorizontal: '10%',
  },
  formName: {
    fontSize: 32,
    fontWeight: '500',
    color: '#fff',
    marginBottom: 8,
    marginHorizontal: '12.5%',
  },
  formDesc: {
    fontSize: 20,
    fontWeight: '400',
    color: 'rgba(255,255,255, 0.8)',
    marginBottom: 32,
    marginHorizontal: '12.5%',
  },
  addImgBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffb855',
    marginHorizontal: '12.5%',
    borderRadius: 12,
    paddingVertical: 8,
    paddingLeft: 20,
  },
  addImgText: {
    marginLeft: 8,
    color: 'rgba(0, 0, 0, 0.6)',
    textTransform: 'uppercase',
    fontSize: 16,
  },
  imgArr: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 16,
  },
  img: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    elevation: 5,
    padding: 12,
    marginHorizontal: 4,
  },
  imgSelected: {
    width: 64,
    height: 64,
  },
  fieldsBox: {
    width: '100%',
    backgroundColor: '#fff',
    elevation: 8,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  textInput: {
    width: '100%',
    marginBottom: 24,
  },
  inputNameAndDesc: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
  },
  inputName: {
    fontSize: 16,
    color: '#ffb855',
  },
  inputDesc: {
    color: 'rgba(56, 53, 53, 0.5)',
  },
  input: {
    borderColor: 'rgba(56, 53, 53, 0.5)',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subButton: {
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -25,
    backgroundColor: '#ffb855',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 24,
    marginBottom: 8,
  },
  subButtonText: {
    color: '#393737',
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: '700',
  },
});

export const htmlStyles: HTMLStyles = {
  subButton: {
    width: '50%',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: -25,
    backgroundColor: '#ffb855',
    border: 0,
    borderRadius: 8,
    padding: '8px 12px',
    marginTop: 24,
    marginBottom: 8,
    cursor: 'pointer',
  },
  subButtonText: {
    color: '#393737',
    textTransform: 'uppercase',
    fontSize: 18,
    fontWeight: 700,
  },
};
