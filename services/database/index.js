import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import { HabSchema } from './schema';
import Component from './models/components';
import App from './models/apps';
import AppComponent from './models/apps_comps';
import AppUI from './models/apps_ui';
import AppActivity from './models/apps_activity';
import AppActivityData from './models/apps_activity_data';
import Users from './models/users';
import Locations from './models/locations';

const adapter = new SQLiteAdapter({
  dbName: 'habdatabase',
  schema: HabSchema,
});

export const database = new Database({
  adapter,
  modelClasses: [
    Users,
    Component,
    App,
    AppComponent,
    AppUI,
    AppActivity,
    AppActivityData,
    Locations,
  ],
  actionsEnabled: true,
});
