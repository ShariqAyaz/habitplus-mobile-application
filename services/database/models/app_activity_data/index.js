import { Model } from '@nozbe/watermelondb';
import { field, relation, json } from '@nozbe/watermelondb/decorators';

export default class AppActivityData extends Model {
  static table = 'app_activity_data';

  @relation('activityid', 'activityid') activityid;
  @json('dataobj', (sanitizer) => (sanitizer ? sanitizer : Sanitizer)) dataObj;
}

function Sanitizer(data) {
  return data;
}