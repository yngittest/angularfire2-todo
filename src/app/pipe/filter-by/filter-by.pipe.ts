import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(array: any[], field: string, value: any): any[] {
    if(array && array.length > 0) {
      const my = array.filter(element => {
        return element[field] === value;
      });
      const no = array.filter(element => {
        return element[field] === null;
      });
      array = my.concat(no);
    }
    return array;
  }

}
