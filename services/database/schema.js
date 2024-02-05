import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const HabSchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'components',
      columns: [
        { name: 'id', type: 'string', isIndexed: true, isOptional: false, isPrimaryKey: true },
        { name: 'name', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'apps',
      columns: [
        { name: 'id', type: 'string', isIndexed: true, isOptional: false, isPrimaryKey: true },
        { name: 'title', type: 'string' },
        { name: 'description', type: 'string' },
        { name: 'created_at', type: 'number' },
        { name: 'updated_at', type: 'number' },
        { name: 'author', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'apps_comps',
      columns: [
        { name: 'id', type: 'string', isIndexed: true, isOptional: false, isPrimaryKey: true },
        { name: 'app_id', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'apps', foreignColumn: 'id' },
        { name: 'comp_id', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'components', foreignColumn: 'id' },
      ],
    }),
    tableSchema({
      name: 'apps_ui',
      columns: [
        { name: 'id', type: 'string', isIndexed: true, isOptional: false, isPrimaryKey: true },
        { name: 'app_id', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'apps', foreignColumn: 'id' },
        { name: 'theme_id', type: 'number' },
      ],
    }),
    tableSchema({
      name: 'apps_activity',
      columns: [
        { name: 'id', type: 'string', isIndexed: true, isOptional: false, isPrimaryKey: true },
        { name: 'app_id', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'apps', foreignColumn: 'id' },
        { name: 'name', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'apps_activity_data',
      columns: [
        { name: 'id', type: 'string', isIndexed: true, isOptional: false, isPrimaryKey: true },
        { name: 'activity_id', type: 'string', isIndexed: true, isForeignKey: true, foreignTable: 'apps_activity', foreignColumn: 'id' },
        { name: 'dataobj', type: 'string' },
      ],
    }),
  ],
});











