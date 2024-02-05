import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class App extends Model {
  static table = 'apps';

  @field('title') title;
  @field('description') description;
  @field('created_at') createdAt;
  @field('updated_at') updatedAt;
  @field('author') author;
}
