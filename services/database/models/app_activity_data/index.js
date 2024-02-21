import { Model } from '@nozbe/watermelondb';
import { field, json, relation } from '@nozbe/watermelondb/decorators';

const sanitizer = (dataObjString) => {
  try {
    return JSON.parse(dataObjString);
  } catch (e) {
    console.error('Invalid JSON in dataobj:', dataObjString);
    return {}; 
  }
};


export default class AppActivityData extends Model {
  static table = 'app_activity_data';

  @field('activityid') activityid;
  @json('dataobj', sanitizer) dataobj;
  @relation('app_activity', 'activityidfk') activity;
}