import { Model } from '@nozbe/watermelondb';
import { field, date, relation, json } from '@nozbe/watermelondb/decorators';

export default class AppActivity extends Model {
  static table = 'app_activity';

  @field('activityid') eventid;
  @relation('apps', 'appid') app;
  @relation('users', 'userid') user; 
  @field('title') title;
  @field('description') description;
  @field('type') type;
  @field('time') time;
  @field('day') day;
  @field('date') date;
  @field('month') month;
  @field('frequency') frequency;
  @date('start_date') startDate;
  @date('end_date') endDate;
  @date('created_at') createdAt;
  @date('updated_at') updatedAt;
  @field('notify') notify;
}
