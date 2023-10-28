import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dashToSpace'
})
export class DashToSpacePipe implements PipeTransform {

  transform(value: string): string {
    return value.replace(/-+/g, ' ');
  }

}
