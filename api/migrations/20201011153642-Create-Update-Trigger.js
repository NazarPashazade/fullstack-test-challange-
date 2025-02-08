// 20201011153645-Add-Update-Trigger.js
"use strict";

exports.up = async function (knex) {
  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_modified_column()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW.updated_at = now();
      RETURN NEW;
    END;
    $$ language 'plpgsql';
  `);
};

exports.down = async function (knex) {
  await knex.raw("DROP FUNCTION IF EXISTS update_modified_column();");
};
