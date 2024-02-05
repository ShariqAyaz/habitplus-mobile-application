import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Component extends Model {
  static table = 'components';

  @field('name') name;
}
