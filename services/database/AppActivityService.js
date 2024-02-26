
import { database } from './index';

const AppActivityService = {

    createActivity: async (activityDetails) => {
        console.log('INVOKED: createActivity');
        await database.write(async () => {
            await database.collections.get('app_activity').create(activity => {
                activity.title = activityDetails.title;
                activity.description = activityDetails.description;
                activity.appid = activityDetails.appid;
                activity.activityid = activityDetails.activityid;
                activity.type = activityDetails.type;
                activity.time = activityDetails.time;
                activity.day = activityDetails.day;
                activity.date = activityDetails.date;
                activity.month = activityDetails.month;
                activity.frequency = activityDetails.frequency;
                activity.start_date = activityDetails.start_date;
                activity.end_date = activityDetails.end_date;
                activity.notify = activityDetails.notify;
                activity.isExpire = activityDetails.isExpire;
                activity.isVisible = activityDetails.isVisible;
                activity.appid = activityDetails.appid;
                activity.userid = activityDetails.userid;
            });
            console.log('New Activity Created:', activityDetails.appid);
        });
    },


    fetchActivities: async () => {
        return database.collections.get('app_activity').query().fetch();
    },

    updateActivity: async (activityId, updates) => {
        await database.write(async () => {
            const activity = await database.collections.get('app_activity').find(activityId);
            await activity.update((a) => {
                a.title = updates.title;
            });
        });
    },

    deleteActivity: async (activityId) => {
        await database.write(async () => {
            const activity = await database.collections.get('app_activity').find(activityId);
            await activity.markAsDeleted();
        });
    },
};


export default AppActivityService;