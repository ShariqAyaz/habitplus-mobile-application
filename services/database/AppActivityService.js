
import { database } from './index';
import { Q } from '@nozbe/watermelondb';


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

    fetchActivityData: async (activityId) => {
        console.log('AppActivityService -> fetchActivityData: activityId:', activityId);
        // Using `where` to filter by `activityid`
        const activities = await database.collections.get('app_activity')
            .query(Q.where('activityid', activityId))
            .fetch();

        // Since `activityid` should be unique, we expect to find only one or none
        return activities.length > 0 ? activities[0] : null;
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

    createActivityData: async (data) => {
        console.log('INVOKED: createActivityData', data.activityid);
        await database.write(async () => {
            await database.collections.get('app_activity_data').create(activityData => {
                activityData.activityid = data.activityid;
                activityData.dataobj = data.dataobj;
            });
        });
    },

    finalizeActivityData: async (activityId) => {
        await database.write(async () => {
            const activityData = await database.collections.get('app_activity_data').find(activityId);
            const dataObj = JSON.parse(activityData.dataobj);

            // Example calculation functions that you would need to define based on your data structure
            const totalDistance = calculateTotalDistance(dataObj.coordinates);
            const totalDuration = calculateTotalDuration(dataObj.coordinates);

            await activityData.update(data => {
                data.dataobj = JSON.stringify({
                    ...dataObj,
                    distance: totalDistance + ' km',  // Assuming distance needs to be updated
                    duration: totalDuration + ' min',  // Assuming duration needs to be updated
                    isComplete: true  // Optionally mark the activity as complete
                });
            });
        });
    },


};


export default AppActivityService;