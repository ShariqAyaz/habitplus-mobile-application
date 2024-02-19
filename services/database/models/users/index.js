import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Users extends Model {
    static table = 'users';

    @field('userid') userid;
    @field('fullname') fullname;
    @field('email') email;
    @field('accessToken') accessToken;
    @field('created_at') createdAt;
    @field('updated_at') updatedAt;
}