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
        { name: 'appid', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'apps', foreignColumn: 'appid' },
        { name: 'theme_id', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'apps_comps',
      columns: [
        { name: '_id', type: 'string', isIndexed: true, isOptional: false, isPrimaryKey: true },
        { name: 'appid', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'apps', foreignColumn: 'appid' },
        { name: 'comp_id', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'components', foreignColumn: '_id' },
      ],
    }),
    tableSchema({
      name: 'apps_activity',
      columns: [
        { name: 'activityid', type: 'string', isIndexed: true, isOptional: false, isPrimaryKey: true },
        { name: 'userid', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'users', foreignColumn: 'userid' },
        { name: 'appid', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'apps', foreignColumn: 'appid' },
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'apps_activity_data',
      columns: [
        { name: 'activityid', type: 'string', isForeignKey: true, foreignTable: 'apps_activity', foreignColumn: 'activityid' },
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
        { name: 'appid', type: 'string', isOptional: true, isIndexed: true, isForeignKey: true, foreignTable: 'apps', foreignColumn: 'appid' },
      ]
    })

  ],
});