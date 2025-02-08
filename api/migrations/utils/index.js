function addCommonColumns(table, knex, with_is_deleted = true) {
  if (with_is_deleted) {
    table.boolean("is_deleted").defaultTo(false);
  }
  table.timestamp("created_at").defaultTo(knex.fn.now());
  table.timestamp("updated_at").defaultTo(knex.fn.now());
  table.string("created_by");
  table.string("updated_by");
}

function addUpdateAtTrigger(knex, tableName) {
  return knex.raw(`
    CREATE TRIGGER update_${tableName}_updated_at
    BEFORE UPDATE ON ${tableName}
    FOR EACH ROW
    EXECUTE PROCEDURE update_modified_column();
  `);
}

function deleteUpdateAtTrigger(knex, tableName) {
  return knex.raw(`DROP TRIGGER IF EXISTS update_${tableName}_updated_at ON ${tableName};`);
}

module.exports = {
  addCommonColumns,
  addUpdateAtTrigger,
  deleteUpdateAtTrigger,
};
