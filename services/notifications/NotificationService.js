import PushNotification from 'react-native-push-notification';

const NotificationService = {
    fetchNotificationSchedule: async () => {
        try {
            const schedule = await database.get('app_activity', ['activityid', 'title', 'description', 'time', 'day', 'date', 'month', 'frequency', 'start_date', 'end_date']);
            return schedule;
        } catch (error) {
            console.error('Error fetching notification schedule:', error);
            return [];
        }
    },
    requestPermission: async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: "App Storage Permission",
                    message: "App needs access to your storage to download and store files.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the storage");
            } else {
                console.log("Storage permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    },
};

export default NotificationService;