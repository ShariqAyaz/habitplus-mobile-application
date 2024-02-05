import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';

export default class AppActivityData extends Model {
  static table = 'apps_activity_data';

  @field('dataobj') dataobj;
  @relation('apps_activity', 'activity_id') activity;
}
