import { Pipe, PipeTransform } from '@angular/core';
import { IEntity } from '../../../model/entity';

@Pipe({
  name: 'listIterable',
  standalone: true
})
export class ListIterablePipe implements PipeTransform {
  transform(value: Array<IEntity>, ...args: unknown[]): string {
    if (value) {
      return value.reduce((acc, curr) => {
        acc += curr.name + ' ';
        return acc;
      }, '');
    }

    return '';
  }
}
