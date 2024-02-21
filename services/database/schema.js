import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const HabSchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'components',
      columns: [
        { name: '_id', type: 'string', isIndexed: true, isOptional: false, isPrimaryKey: true },
        { name: 'name', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'apps',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'appid', type: 'string' , isIndexed: true, isOptional: false, isPrimaryKey: true },
        { name: 'description', type: 'string' },
        { name: 'author', type: 'string' },
        { name: 'img_url', type: 'string' },
        { name: 'profile_url', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'apps_ui',
      columns: [
        { name: 'appidfk', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'apps', foreignColumn: 'appid' },
        { name: 'theme_id', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'apps_comps',
      columns: [
        { name: '_id', type: 'string', isIndexed: true, isOptional: false, isPrimaryKey: true },
        { name: 'appidfk', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'apps', foreignColumn: 'appid' },
        { name: 'comp_id', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'components', foreignColumn: '_id' },
      ],
    }),
    tableSchema({
      name: 'app_activity',
      columns: [
        { name: 'activityid', type: 'string', isOptional: false},
        { name: 'appidfk', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'apps', foreignColumn: 'appid' },
        { name: 'useridfk', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'users', foreignColumn: 'userid' },
        { name: 'appid', type: 'string'},
        { name: 'userid', type: 'string'},
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string', isOptional: true },
        { name: 'type', type: 'string', default: 'DAILY' }, ///{'DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY'}
        { name: 'time', type: 'string', isOptional: true },
        { name: 'day', type: 'number', isOptional: true },
        { name: 'date', type: 'number', isOptional: true },
        { name: 'month', type: 'number', isOptional: true },
        { name: 'frequency', type: 'number' },
        { name: 'start_date', type: 'number' },
        { name: 'end_date', type: 'number', isOptional: true },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number'},
        { name: 'notify', type: 'boolean', default: true },
      ],
    }),
    tableSchema({
      name: 'app_activity_data',
      columns: [
        { name: 'activityidfk', type: 'string', isForeignKey: true, foreignTable: 'app_activity', foreignColumn: 'id' },
        { name: 'activityid', type: 'string',isOptional: false },
        { name: 'dataobj', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'users',
      columns: [
        { name: 'userid', type: 'string' , isIndexed: true, isOptional: false, isPrimaryKey: true },
        { name: 'fullname', type: 'string'},
        { name: 'email', type: 'string', isIndexed: true},
        { name: 'accessToken', type: 'string'},
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'locations',
      columns: [
        { name: 'latitude', type: 'number', isOptional: false },
        { name: 'longitude', type: 'number', isOptional: false },
        { name: 'timestamp', type: 'number', isOptional: false },
        { name: 'appidfk', type: 'string', isOptional: true, isIndexed: true, isForeignKey: true, foreignTable: 'apps', foreignColumn: 'appid' },
      ]
    })

  ],
});