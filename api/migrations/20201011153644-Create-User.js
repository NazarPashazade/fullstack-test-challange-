"use strict";

const { addCommonColumns, addUpdateAtTrigger, deleteUpdateAtTrigger } = require("./utils");

const TABLE_NAME = "users";

exports.up = async function (knex) {
  await knex.schema.createTable(TABLE_NAME, (t) => {
    t.increments("id").primary();
    t.string("first_name");
    t.string("last_name");
    t.string("phone");
    t.string("photo").defaultTo(null);
    t.string("email");
    t.string("password_hash");
    t.string("confirmation_hash").defaultTo(null);
    t.boolean("is_active").defaultTo(false);
    t.boolean("is_email_verified").defaultTo(false);

    addCommonColumns(t, knex, false);
  });

  await addUpdateAtTrigger(knex, TABLE_NAME);
};

exports.down = async function (knex) {
  await deleteUpdateAtTrigger(knex, TABLE_NAME);
  return knex.schema.dropTable(TABLE_NAME);
};
