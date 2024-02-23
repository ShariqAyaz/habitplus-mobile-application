import { Model } from '@nozbe/watermelondb';
import { field, date, boolean, relation } from '@nozbe/watermelondb/decorators';

export default class AppActivity extends Model {
  static table = 'app_activity';

  static associations = {
    apps: { type: 'belongs_to', key: 'appidfk' },
    users: { type: 'belongs_to', key: 'useridfk' },
  };

  @field('activityid') activityid;
  @field('title') title;
  @field('description') description;
  @field('type') type;
  @field('time') time;
  @field('day') day;
  @field('date') date;
  @field('month') month;
  @field('frequency') frequency;
  @field('start_date') startDate;
  @field('end_date') endDate;
  @field('created_at') createdAt;
  @field('updated_at') updatedAt;
  @field('notify') notify;
  @field('isExpire') isExpire;
  @field('isVisible') isVisible;
  @field('appid') appid;
  @field('userid') userid;
  @relation('apps', 'appidfk') app;
  @relation('users', 'useridfk') user;
  
  @field('appidfk') appidfk;
  @field('useridfk') useridfk;
}
