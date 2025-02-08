import { Knex } from "knex";
import { Expression, Model, OrderByDirection, PrimitiveValue, QueryBuilder, RawBuilder, Transaction } from "objection";

import { ModelRelation, ModelWhereWithIn } from "../../interfaces";
import { ORDER_TYPES } from "../constants";

/**
 * Modifies provided query builder with `where` conditions.
 *
 * Objection has different methods for `where`: where, whereIn
 * `formQueryBuilderWhere` can be used for using both single and multiple values for the column.
 *
 * @param {QueryBuilder} queryBuilder - An objection query builder.
 * @param {ModelWhereWithIn} where - An object with `where` filters,
 * where keys are model properties and values are either single values or arrays of values.
 *
 * @example
 * const updateUsers = async (
 *   payload: PartialModelObject<Omit<User, "id">>,
 *   where: ModelWhereWithIn<User>,
 *   transaction?: Transaction,
 * ) => formQueryBuilderWhere(User.query(transaction), where).update(payload);
 *
 * @example
 * updateUsers({ status: "active" }, { id: 5 });
 *
 * @example
 * updateUsers({ status: "active" }, { id: [5, 6] });
 *
 * @returns {QueryBuilder} A modified query builder object.
 */
export const formQueryBuilderWhere = <T extends Model>(queryBuilder: QueryBuilder<T>, where: ModelWhereWithIn<T>) => {
  Object.entries(where).forEach(([prop, val]: [string, Expression<PrimitiveValue>]) => {
    if (Array.isArray(val)) {
      queryBuilder.whereIn(prop, val);
    } else {
      queryBuilder.where(prop, val);
    }
  });

  return queryBuilder;
};

/**
 * Recursively iterates through relations and generates objection relations string
 * (e.g., `roles(defaultSelects).[permissions(defaultSelects)]`).
 *
 * @param {ModelRelation} - A relation object.
 *
 * @returns {string} An objection relations string.
 */
const joinRelation = ({ relation, modifier, relations = [] }: ModelRelation) => {
  let relString = `${relation}${modifier ? `(${modifier})` : ""}`;
  if (relations.length > 0) {
    const childRelations = relations.map((relation) => joinRelation(relation));
    relString += `.[${childRelations.join()}]`;
  }
  return relString;
};

/**
 * Creates an objection query builder with `where` conditions, adds relations via `withGraphFetched` method
 * and returns either the first result or the whole found list based on `singleItem` argument.
 *
 * May be used for common fetch methods: both for a single entity and list of entities retrieving.
 *
 * @param {typeof Model} model - An objection model class.
 * @param {ModelWhereWithIn} where - An object with `where` filters.
 * @param {boolean} singleItem - A flag indicating whether the result must be a single value or an array of values.
 * @param {ModelRelation[]} relations - A list of relations to be fetched with the main result.
 * @param {Knex} [transaction] - knex transaction object
 *
 * @example
 * const getSubscription = (
 *   where: ModelWhereWithIn<Subscription>,
 *   relations: ModelRelation[] = [],
 *   transaction?: Transaction,
 * ) => findEntities(Subscription, where, true, relations, transaction);
 *
 * @example
 * const getSubscriptions = (
 *   where: ModelWhereWithIn<Subscription>,
 *   relations: ModelRelation[] = [],
 *   transaction?: Transaction,
 * ) => findEntities(Subscription, where, false, relations, transaction);
 *
 * @returns {QueryBuilder} A modified query builder object.
 */
export function findEntities<T extends Model>(
  model: typeof Model,
  where: ModelWhereWithIn<T>,
  singleItem: true,
  relations: ModelRelation[],
  transaction?: Knex,
): QueryBuilder<T, T>;
export function findEntities<T extends Model>(
  model: typeof Model,
  where: ModelWhereWithIn<T>,
  singleItem: false,
  relations: ModelRelation[],
  transaction?: Knex,
): QueryBuilder<T, T[]>;
export function findEntities<T extends Model>(
  model: typeof Model,
  where: ModelWhereWithIn<T>,
  singleItem = false,
  relations: ModelRelation[],
  transaction?: Transaction,
) {
  const query = formQueryBuilderWhere(model.query(transaction), where);
  if (singleItem) {
    query.first();
  }
  relations.forEach((relation) => {
    query.withGraphFetched(joinRelation(relation));
  });
  return query;
}

/**
 * Adds search functionality to a Knex query based on specified fields and search term.
 *
 * This function modifies the given query to filter results based on a search term.
 * It applies a `LIKE` condition to each specified field to match the search term.
 * If a search term is provided, the function constructs a query with `OR` conditions for the specified fields.
 *
 * - The function adds a `WHERE` clause with multiple `OR` conditions if the search term is present.
 * - Each field in `searchFields` is checked to see if it contains the search term.
 *
 * @param {QueryBuilderType<T>} query - The Knex query builder instance to which search functionality will be applied.
 * @param {string} search - The search term to filter results.
 * @param {(string | RawBuilder)[]} searchFields - An array of column names or raw SQL builders to apply the search term to.
 * @returns {QueryBuilderType<T>} Returns the modified query with the applied search conditions.
 */
export function addSearchToQuery<T extends Model>(
  query: QueryBuilder<T>,
  search: string,
  searchFields: (string | RawBuilder)[],
) {
  if (search) {
    query.where((builder) => searchFields.map((field) => builder.orWhere(field, "ILIKE", `%${search}%`)));
  }

  return query;
}

/**
 * Adds sorting to a Knex query based on specified columns and sort order.
 *
 * This function modifies the given query by applying sorting on one or more columns.
 * It uses the provided sort order for sorting. If no sort order is specified, the default ascending order is applied.
 *
 * - The function iterates over the `sortBy` array, adding `ORDER BY` clauses for each column.
 * - It applies the specified `sortOrder` to each column. If no order is specified, it defaults to ascending order.
 *
 * @param {QueryBuilderType<T>} query - The Knex query builder instance to which sorting will be applied.
 * @param {(string | RawBuilder)[]} sortBy - An array of column names or raw SQL builders to sort by.
 * @param {OrderByDirection} sortOrder - The direction of sorting (`'asc'` or `'desc'`).
 * @returns {QueryBuilderType<T>} Returns the modified query with the applied sorting.
 */
export function addSortToQuery<T extends Model>(
  query: QueryBuilder<T>,
  sortBy: (string | RawBuilder)[],
  sortOrder: OrderByDirection,
) {
  return sortBy.reduce<QueryBuilder<T>>((result: QueryBuilder<T>, column: string | RawBuilder) => {
    result.orderBy(column, sortOrder ? sortOrder : ORDER_TYPES.ASC);
    return result;
  }, query);
}
