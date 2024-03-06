import PushNotification from 'react-native-push-notification';
import { PermissionsAndroid } from 'react-native';

const NotificationService = {

    fetchNotificationSchedule: async () => {
        try {
            return [];
        } catch (error) {
            console.error('Error fetching notification schedule:', error);
            return [];
        }
    },
    requestPermission: async () => {
        try {
        } catch (err) {
            console.warn(err);
        }
    },
};

export default NotificationService;