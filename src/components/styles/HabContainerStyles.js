import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  TitleStyle:{ color: 'white', fontSize: 24, fontWeight: 'bold' },
  CreditStyle:{ marginTop: 0, paddingTop: 0, paddingLeft: 4, color: '#ECB22E', fontSize: 12, fontStyle: 'italic' },
  HabContainerStyle:{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', padding: 2, marginTop: 8 
},
  buttonStyle: {
    width: '90%',
    height: 40,
    alignSelf: 'center',
    padding: 10,
    marginTop: 8,
    color: 'white',
    backgroundColor: '#075E54',
  },
  greenButtonText: {
    color: 'white', fontSize: 14, fontWeight: 'bold', alignSelf: 'center' 
  },
  circle:{
    width: 25,
    height: 25,
    borderRadius: 100/2,
    padding:6,
    margin:16,
    borderWidth: 0,
    backgroundColor: '#333',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    color: 'white',
    fontSize: 16,
    padding: 20, // Example padding
    textAlign: 'center',
  },
  
  itemContainer : {
    backgroundColor: '#333',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 0.3,
    borderColor: '#FFF',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
  flatlistStyle: {
    alignSelf: 'stretch',
    margin: 10,
  },
  menuItem: {
    backgroundColor: '#333333',
    padding: 10,
    width: '80%',
    alignItems: 'center',
    marginVertical: 4,
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 20,
    color: 'black', 
    fontColor: 'black',
  },
  separator: {
    height: 1,
    backgroundColor: '#ECB22E',
    width: '90%',
    marginVertical: 4,
    alignSelf: 'center',  
  },
  closeButton: {
    width: 120,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F14F21',
    marginBottom: 20,
    borderRadius: 30,
    alignSelf: 'center', position: 'absolute', bottom: 0, marginBottom: 20
  },
  closeButtonText: {
    fontFamily: 'Roboto-Black',
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontFamily: 'Roboto-Bold',
    marginTop: 20,
    fontColor: 'black',
  },
  container: {
    minHeight: 120,
    padding: 4,
    width: '88%',
    alignSelf: 'center',
    paddingBottom: 16,
    margin: 8,
    marginBottom: 20,
    borderRadius: 22,
    backgroundColor: '#333333',
    flexGrow: 1,
    flexShrink: 1,
    shadowColor: 'black',
    shadowOffset: { width: -10, height: 10 },
    shadowOpacity: 0.54,
    shadowRadius: 4,
    elevation: 5,
  },
  TextInputStyle:{
    borderColor: 'white',
        borderWidth: 0.3,
        margin: 8,
        width: '90%',
        marginBottom: 8,
        borderRadius: 2,
        color: 'white',
        alignSelf: 'center',
        padding: 10,
  }
  // Add other styles here if needed
});
