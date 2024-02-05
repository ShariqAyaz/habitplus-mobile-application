import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';

export default class AppUI extends Model {
  static table = 'apps_ui';

  @field('theme_id') themeId;
  @relation('apps', 'app_id') app;
}
