import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToValue'
})
export class ObjectToValuePipe implements PipeTransform {

  transform(objects: unknown[]): unknown {
    return Object.values(objects);
  }

}
