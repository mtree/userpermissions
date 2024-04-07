import { IEntity } from "../../../model/entity";

/**
 * Upsert entities
 * @param array The array of entities
 * @param item The entity to upsert
 * @param itemUpdate The partial entity to update (optional)
 * @returns The updated array of entities
 */
export function upsertEntity<T extends IEntity>(array: Array<T>, item: T, itemUpdate?: Partial<T>): Array<T> {
  const index = array.findIndex(i => i.id === item.id);
  
  if (index === -1) {
    return [...array, item];
  } else {
    return array.map((el, i) => i === index ? { ...item, ...itemUpdate } : el);
  }
}

/**
 * Update entity
 * @param array The array of entities
 * @param item The entity to update
 * @returns The updated array of entities
 */
export function updateEntity<T extends IEntity>(array: Array<T>, item: T): Array<T> {
  const index = array.findIndex(i => i.id === item.id);
  
  if (index === -1) {
    return array;
  } else {
    return array.map((el, i) => i === index ? item : el);
  }
}
