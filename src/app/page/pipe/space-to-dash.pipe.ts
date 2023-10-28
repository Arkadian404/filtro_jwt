import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'spaceToDash'
})
export class SpaceToDashPipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/\s+/g, '-')
  }

}
