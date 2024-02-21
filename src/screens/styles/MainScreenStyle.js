import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    picker: {
        width: '90%',
        borderWidth: 1,
        borderColor: 'black', // Add border color here
        backgroundColor: 'lightgray', // Add background color here
        color: 'black',
        margin: 10,
    },
    map: {
        flex: 1,
        width: '90%',
        height: '100%',
    },
    input: {
        backgroundColor: 'lightgray',
        borderRadius: 0,
        color: 'black',
        padding: 10,
        width: '90%',
        marginBottom: 10,
        fontSize: 16,
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
    saveButton: {
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'green',
        marginBottom: 1,
        borderRadius: 30,
        alignSelf: 'center', position: 'absolute', bottom: 0, marginBottom: 20
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
    closeButtonText: {
        fontFamily: 'Roboto-Bold',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
    },
    closeButtonText: {
        fontFamily: 'Roboto-Bold',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 16,
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
        marginTop: 80,
        height: '100%',
        width: '100%',
        marginBottom: 60,
    },
    body: {
        flex: 1,
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