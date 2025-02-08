"use strict";

const { addCommonColumns, addUpdateAtTrigger, deleteUpdateAtTrigger } = require("./utils");
const TABLE_NAME = "roles";

exports.up = async (knex) => {
  await knex.schema.createTable(TABLE_NAME, (t) => {
    t.increments("id").primary();
    t.string("name");
    t.string("description");

    addCommonColumns(t, knex, false);
  });

  await addUpdateAtTrigger(knex, TABLE_NAME);
};

exports.down = async function (knex) {
  await deleteUpdateAtTrigger(knex, TABLE_NAME);
  return knex.schema.dropTable(TABLE_NAME);
};
