const path = require("path");

const { genSalt, hash } = require("bcryptjs");

const { isSeedAvailable, createKnexSeed } = require("./utils");

const users = [
  {
    first_name: "User",
    last_name: "Test",
    email: "test.user@ninetwothree.co",
    is_active: true,
    is_email_verified: true,
    created_by: "System",
  },
];

exports.seed = async function (knex) {
  const fileName = path.basename(__filename);
  const is_seed_available = await isSeedAvailable(knex, fileName);

  if (!is_seed_available) return;

  return knex.transaction(async (trx) => {
    try {
      await trx("knex_seeds_lock").where("id", 1).update({ is_locked: true });

      const salt = await genSalt(10);
      const password_hash = await hash("Qwe12345", salt);

      await Promise.all(
        users.map((user) => {
          return trx("users").insert({
            ...user,
            password_hash,
          });
        }),
      );

      return createKnexSeed(trx, fileName);
    } catch (error) {
      trx.rollback();
      console.log(error);
    } finally {
      await trx("knex_seeds_lock").where("id", 1).update({ is_locked: false });
    }
  });
};
