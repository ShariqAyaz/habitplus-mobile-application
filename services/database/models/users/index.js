import { Model } from '@nozbe/watermelondb';
import { field } from '@nozbe/watermelondb/decorators';

export default class Users extends Model {
    static table = 'users';

    @field('fullname') fullname;
    @field('email') email;
    @field('password') password;

}