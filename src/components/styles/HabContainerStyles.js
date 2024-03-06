import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    // Main Hab App Container
    container: {
      minHeight: 120,
      paddingTop: 6,
      paddingLeft: 6,
      paddingRight: 6,
      paddingBottom: 18,
      width: '94%',
      alignSelf: 'center',
      margin: 8,
      marginBottom: 6,
      borderRadius: 18,
      backgroundColor: '#333333',
      flexGrow: 1,
      flexShrink: 1,
      shadowColor: 'black',
      shadowOffset: { width: 2, height: 4 },
      shadowOpacity: 0.44,
      shadowRadius: 5,
      elevation: 2,
    },
    TitleStyle: {
    color: 'white',
    fontSize: 24, fontWeight: 'bold'
  },
  CreditStyle: {
    marginTop: -4,
    paddingTop: 0,
    paddingLeft: 4,
    color: '#ECB22E',
    fontSize: 13,
    fontStyle: 'italic',
    fontWeight:'200',
  },
  HabContainerStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    padding: 0, marginTop: 3
  },
  ActivityView: {
    marginTop: 3,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 12,
    paddingRight: 8,
    borderWidth: 0.3,
    borderRadius: 1,
    backgroundColor: '#3f3f3f',
    width: '94%',
    alignSelf: 'center',
  },
  ActivityTitle: {
    color: 'white',
    textTransform: 'uppercase',
    fontSize: 11,
    fontWeight: 'bold'
  },
  ActivityFrequency: {
    color: '#003666', fontSize: 10,
    fontWeight: 'bold'
  },
  ActivityFrequencyAt: {
    color: 'white', fontSize: 12,
    fontWeight: '100',
  },
  ActivityIcon: {
    justifyContent: 'right',
    alignItems: 'right'
  },
  buttonStyle: {
    width: '94%',
    height: 40,
    alignSelf: 'center',
    padding: 10,
    marginBottom: 3,
    marginTop: 8,
    color: 'white',
    backgroundColor: '#0085ad',
  
  },
  greenButtonText: {
    color: 'white', fontSize: 14, fontWeight: 'bold', alignSelf: 'center'
  },
  circle: {
    width: 25,
    height: 25,
    borderRadius: 100 / 2,
    padding: 6,
    margin: 16,
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
  itemContainer: {
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
  deleteButton: {
    width: 130,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    marginBottom: 100,
    borderRadius: 30,
    alignSelf: 'center', position: 'absolute',
    bottom: 0,
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
  TextInputStyle: {
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
});
