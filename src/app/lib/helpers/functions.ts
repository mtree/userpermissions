import { IEntity } from "../../../model/entity";

/**
 * Upsert entities
 * @param array 
 * @param item 
 * @returns 
 */
export function upsertEntities<T extends IEntity>(array: Array<T>, item: T): Array<T> {
  const index = array.findIndex(i => i.id === item.id);
  
  if (index === -1) {
    return [...array, item];
  } else {
    return array.map((el, i) => i === index ? item : el);
  }
}
