import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class App extends Model {
  
  static table = 'apps';

  @field('appid') appid;
  @field('title') title;
  @field('description') description;
  @field('author') author;
  @field('img_url') img_url;
  @field('profile_url') profile_url;
  @field('created_at') createdAt;
  @field('updated_at') updatedAt;
}
