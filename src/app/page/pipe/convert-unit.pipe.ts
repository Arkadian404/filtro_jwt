import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertUnit'
})
export class ConvertUnitPipe implements PipeTransform {

  transform(value: number, categoryId:number): string {
    if(categoryId == 4){
      if(value < 1000){
        return 'Chai ' + value + ' ml';
      }else{
        return 'Chai ' +  value/1000 + ' lit';
      }
    }

    if (value < 1000) {
      return 'Gói '+ value + ' gr';
    } else {
      return 'Gói '+ value / 1000 + ' kg';
    }
  }

}
