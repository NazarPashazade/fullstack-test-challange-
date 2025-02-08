export type ModelWhere<T> = {
  [key in keyof T]?: T[key];
};
//eslint-disable-next-line
export type ModelWhereWithIn<T extends Record<string, any>> = {
  [key in keyof T]?: T[key] | T[key][];
};

/**
 * @typedef {Object} ModelRelation
 * @property {string} relation - A relation name from the model's `relationMappings` property.
 * @property {string} modifier - A relation modifier name from the model's `modifiers` property.
 * @property {ModelRelation[]} relations - Relation's relations.
 */
export interface ModelRelation {
  relation: string;
  modifier?: string;
  relations?: ModelRelation[];
}
