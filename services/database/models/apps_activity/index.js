import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';

export default class AppActivity extends Model {
  static table = 'apps_activity';

  @field('activityid') activityid;
  @relation('apps', 'appid') app;
  @relation('users', 'userid') app;
  @field('title') title;
  @field('description') title;
}
