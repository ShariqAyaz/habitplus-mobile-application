import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';

export default class AppComponent extends Model {
  static table = 'apps_comps';

  @field('app_id') appId;
  @field('comp_id') compId;

  @relation('apps', 'app_id') app;
  @relation('components', 'comp_id') component;
}
