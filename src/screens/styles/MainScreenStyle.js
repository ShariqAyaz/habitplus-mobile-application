import { StyleSheet } from 'react-native';
import { ColorScheme } from '../../constants/ColorScheme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    modalNewHabit:{
        backgroundColor: '#dadada',
        flex: 12,
        opacity: 0.99
    },
    modalTitle: {
        textAlign: 'center',
        marginTop: 6,
        color: ColorScheme.primary,
        fontSize: 18,
        fontWeight: 'bold',
        paddingBottom: 0,
        alignItems: 'center'
    },
    modalSubTitle: {
        textAlign: 'justify',
        marginTop: 0,
        width: '90%',
        color: ColorScheme.secondary,
        fontSize: 12,
        fontStyle: 'italic',
        paddingLeft:25
    },
    datePickerbtn: {
        color: 'black',
        marginTop: 8,
        fontSize: 14,
        fontWeight: 'bold',
    },
    helpingTitle: {
        color: '#333333',
        textAlign: 'left',
        alignSelf: 'flex-start',
        paddingLeft: 22,
        paddingTop: 6,
        marginBottom: -4,
        fontSize: 14,
        fontWeight: 'bold',
    },
    notifyView: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'center',
    },
    notifyText: {
        color: '#333333',
        textAlign: 'left',
        alignSelf: 'flex-start',
        fontSize: 14,
        marginTop: 3,
        marginLeft: 3,
        fontWeight: 'bold'
    },
    ModalGroupView: {
        width: '94%',
        backgroundColor: '#ffffff',
        alignSelf: 'center',
        borderRadius:10,
        marginBottom: 10,
        paddingBottom: 12,
    },
    datePicker: {
        backgroundColor: 'lightgray',
        borderRadius: 0,
        color: '#333333',
        width: '90%',
        height: 40,
        marginTop: 6,
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 6,
        alignSelf: 'center',
        fontSize: 20,
        paddingLeft: 0,
        paddingRight: 0,
    },
    picker: {
        backgroundColor: 'lightgray',
        color: 'black',
        width: '90%',
        margin: 6,
        borderRadius: 6,
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 16,
        paddingLeft: 18,
        paddingRight: 18,
    },
    map: {
        flex: 1,
        width: '90%',
        height: '100%',
    },
    inputTitle: {
        backgroundColor: 'lightgray',
        borderRadius: 0,
        color: 'black',
        width: '90%',
        margin: 6,
        borderRadius: 6,
        fontSize: 16,
        paddingLeft: 18,
        paddingRight: 18,
        paddingBottom: 12,
        paddingTop: 12,
    },
    inputDescription: {
        backgroundColor: 'lightgray',
        borderRadius: 0,
        color: 'black',
        width: '90%',
        height: 80,
        textAlignVertical: 'top',
        margin: 6,
        borderRadius: 4,
        fontSize: 14,
        paddingLeft: 8,
        paddingRight: 8,
        paddingBottom: 8,
        paddingTop: 4,
    },
    closeButton: {
        width: 120,
        height: 50,
        backgroundColor: '#C01818',
        marginBottom: 20,
        borderRadius: 60,
        bottom: 0,
        marginBottom: 20
    },
    saveButton: {
        width: 120,
        height: 50,
        backgroundColor: ColorScheme.success,
        borderRadius: 60,
        bottom: 0,
        marginBottom: 20,
        marginBottom: 20
    },
    saveButtonText: {
        fontFamily: 'Roboto-Bold',
        marginLeft: 22,
        marginTop: 12,
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
    closeButtonText: {
        fontFamily: 'Roboto-Bold',
        marginLeft: 38,
        marginTop: 12,
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
    btnLocationStartStop: {
        fontFamily: 'Roboto-Bold',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
    startButton: {
        width: 200,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eb8634',
        borderRadius: 10,
        marginTop: 20,
        alignSelf: 'center',
    },

    emptyText: {
        color: '#F14F21',
        fontSize: 13,
        marginTop: 4,
        paddingLeft: 26,
        lineHeight: 18,
        letterSpacing: 1,
        textShadowColor: 'silver',
        textShadowOffset: { width: 0.01, height: 0.05 },
        textShadowRadius: 0.1,
    },
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        paddingLeft: 16,
        shadowColor: '#333333',
        shadowOffset: {
            width: -2,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 0,
        elevation: 4,
    },
    greetingText: {
        fontFamily: 'Roboto-Black',
        color: '#2EB67D',
        fontSize: 28,
    },
    bodyContainer: {
        flex: 1,
        marginTop: 60,
        height: '100%',
        width: '100%',
        marginBottom: 60,
    },
    body: {
        flex: 1,
    },
    bottomModal: {
        position: 'absolute',
        bottom: 0,
        paddingTop: 12,
        marginBottom: -28,
        height: 100,
        borderColor: 'silver',
        borderRadius: 30,
        borderWidth: 1,
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        justifyContent: 'space-around'
    },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        backgroundColor: 'silver',
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 4,
        paddingTop: 6,
        alignItems: 'center',
    },

    separator: {
        height: 1,
        backgroundColor: '#ECB22E',
        width: '90%',
        marginVertical: 4,
        alignSelf: 'center',
    },
    bottomBarButton: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomBarButtonText: {
        color: 'black',
        fontFamily: 'Roboto-Medium',
        fontSize: 11,
        textAlign: 'center',
    },
    iconContainer: {
        alignItems: 'center',
    },
    icon: {
        width: 20,
        height: 20,
    },
});