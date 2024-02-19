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
        { name: 'appid', type: 'string' , isIndexed: true, isOptional: false },
        { name: 'description', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'author', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'apps_ui',
      columns: [
        { name: 'app_id', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'apps', foreignColumn: 'id' },
        { name: 'theme_id', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'apps_comps',
      columns: [
        { name: '_id', type: 'string', isIndexed: true, isOptional: false, isPrimaryKey: true },
        { name: 'app_id', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'apps', foreignColumn: '_id' },
        { name: 'comp_id', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'components', foreignColumn: '_id' },
      ],
    }),
    tableSchema({
      name: 'apps_activity',
      columns: [
        { name: '_id', type: 'string', isIndexed: true, isOptional: false, isPrimaryKey: true },
        { name: 'app_id', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'apps', foreignColumn: '_id' },
        { name: 'name', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'apps_activity_data',
      columns: [
        { name: '_id', type: 'string', isIndexed: true, isOptional: false, isPrimaryKey: true },
        { name: 'activity_id', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'apps_activity', foreignColumn: '_id' },
        { name: 'dataobj', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'users',
      columns: [
        { name: 'fullname', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'apps_activity', foreignColumn: '_id' },
        { name: 'email', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'apps_activity', foreignColumn: '_id' },
        { name: 'password', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'apps_activity', foreignColumn: '_id' },
      ],
    }),
    tableSchema({
      name: 'locations',
      columns: [
        { name: 'latitude', type: 'number', isOptional: false },
        { name: 'longitude', type: 'number', isOptional: false },
        { name: 'timestamp', type: 'number', isOptional: false },
        { name: 'app_id', type: 'string', isOptional: true, isIndexed: true, isForeignKey: true, foreignTable: 'apps', foreignColumn: '_id' },
      ]
    })

  ],
});