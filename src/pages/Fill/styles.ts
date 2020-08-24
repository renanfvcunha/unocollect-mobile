import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e7e7e7',
  },
  content: {
    paddingTop: 16,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  formName: {
    fontSize: 32,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 8,
  },
  formDesc: {
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 32,
  },
  addImgBtn: {
    width: '75%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196f3',
    borderRadius: 8,
    paddingVertical: 16,
  },
  addImgText: {
    marginLeft: 8,
    color: '#fff',
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
  textInput: {
    width: '75%',
    marginBottom: 24,
  },
  input: {
    borderColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  inputDesc: {
    color: '#bbb',
  },
  subButton: {
    width: '75%',
    alignItems: 'center',
    backgroundColor: '#4caf50',
    borderRadius: 8,
    paddingVertical: 16,
    marginTop: 24,
    marginBottom: 8,
  },
  subButtonText: {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: 16,
  },
  offView: {
    width: '75%',
    backgroundColor: '#ba000d',
    borderRadius: 8,
    elevation: 8,
    padding: 4,
  },
  offText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default styles;
