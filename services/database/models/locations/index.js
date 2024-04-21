import { Model } from '@nozbe/watermelondb';
import { field, date } from '@nozbe/watermelondb/decorators';

export default class Locations extends Model {

    static table = 'locations';
    @field('latitude') latitude;
    @field('longitude') longitude;
    @date('timestamp') timestamp; 
    @field('app_id') appIDs; 
    @field('activityid') activityID;
}
