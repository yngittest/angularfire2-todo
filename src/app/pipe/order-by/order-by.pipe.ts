import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(array: any[], field: string, desc: boolean = false): any[] {
    if(array && array.length > 0) {
      array.sort((a: any, b: any) => {
        if (a[field] < b[field]) {
            return -1 * (desc ? -1 : 1);
        } else if (a[field] > b[field]) {
            return 1 * (desc ? -1 : 1);
        } else {
            return 0;
        }
      });
    }
    return array;
  }
}
