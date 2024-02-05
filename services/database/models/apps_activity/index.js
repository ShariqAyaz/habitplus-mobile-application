import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';

export default class AppActivity extends Model {
  static table = 'apps_activity';

  @field('name') name;
  @relation('apps', 'app_id') app;
}
